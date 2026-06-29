import Groq from "groq-sdk";
import { createSystemPrompt } from "../prompt.js";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.js";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../helpers/ApiError.js";
import { AIAction } from "../types/interview-actions.types.js";
import { parse } from "node:path";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface SessionDetail {
  name: string;
  experience: string;
  role: string;
  numberOfQuestions: number;
  userId: string;
  interviewId: string;
}

type InterviewSessionState = {
  messages: ChatCompletionMessageParam[];
};

const interviewSessions = new Map<string, InterviewSessionState>();

const isSelectionChance = (
  value: unknown
): value is "LOW" | "MEDIUM" | "HIGH" =>
  value === "LOW" || value === "MEDIUM" || value === "HIGH";

export async function createInterviewSession({
  name,
  experience,
  role,
  numberOfQuestions,
  userId,
  interviewId,
}: SessionDetail) {

  // get current interview
  const interviewDetail = await prisma.interview.findUnique({
    where: {
      id: interviewId,
    },
  });

  if (!interviewDetail) {
    throw new ApiError(404, "Interview detail not found");
  }

  // using interviewId as session key
  let session = interviewSessions.get(interviewId);

  // create session only once
  if (!session) {
    session = {
      messages: [
        {
          role: "system",
          content: createSystemPrompt({
            name,
            experience,
            role,
            numberOfQuestions,
          }),
        },
      ],
    };

    interviewSessions.set(interviewId, session);
  }

  async function sendMessage(text: string, onSentence?: (sentence: string) => void) {
    session!.messages.push({
      role: "user",
      content: text,
    });

    // ai response
    const res = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b", // Using a valid Groq model

      messages: session!.messages,

      response_format: {
        type: "json_object",
      },
      stream: true,
    });

    let aiContent = "";
    let emittedSentencesCount = 0;

    for await (const chunk of res) {
      const delta = chunk.choices[0]?.delta?.content || "";
      aiContent += delta;

      if (onSentence) {
        const questionMatch = aiContent.match(/"question"\s*:\s*"((?:[^"\\]|\\.)*)/);
        if (questionMatch) {
          const currentQuestionStr = questionMatch[1];
          const decodedStr = currentQuestionStr.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');

          const completeSentences = decodedStr.match(/[^.!?]+[.!?]+/g) || [];

          while (emittedSentencesCount < completeSentences.length) {
            const sentenceToEmit = completeSentences[emittedSentencesCount].trim();
            if (sentenceToEmit) {
              onSentence(sentenceToEmit);
            }
            emittedSentencesCount++;
          }
        }
      }
    }

    if (!aiContent) {
      throw new ApiError(500, "AI returned empty response");
    }

    let parsed: AIAction;

    // parse ai json
    try {
      parsed = JSON.parse(aiContent) as AIAction;
    } catch {
      throw new ApiError(500, "AI response is not valid JSON");
    }

    // store assistant response in memory
    session!.messages.push({
      role: "assistant",
      content: aiContent,
    });
    console.log(aiContent)

    switch (parsed.action) {

      case "END_INTERVIEW": {
        await prisma.interview.update({
          where: {
            id: interviewDetail!.id,
          },

          data: {
            overallScore: parsed.overallScore,
            summary: parsed.summary,
            isCompleted: true,
            
            
            
            strengths: parsed.strengths,
            weaknesses: parsed.weaknesses,
            improvements: parsed.improvements,
            finalInterviewVerdict: parsed.finalInterviewVerdict,
            candidatePerspective: parsed.candidatePerspective,
            selectionChances: isSelectionChance(parsed.selectionChances)
              ? parsed.selectionChances
              : undefined,
          },
        });

        if (parsed.questionEvaluations && parsed.questionEvaluations.length > 0) {
          await prisma.question.createMany({
            data: parsed.questionEvaluations.map((ev) => ({
              interviewId: interviewDetail!.id,
              question: ev.question,
              expectedAnswer: Array.isArray(ev.expectedAnswer)
                ? ev.expectedAnswer
                : [],
              score: ev.score,
            })),
          });
        }

        interviewSessions.delete(interviewId);

        return {
          raw: aiContent,
          parsed,
        };
      }

      // new question
      case "ASK_QUESTION":
      case "FOLLOW_UP":
      case "CANT_CONTINUE": {
        const finalQuestion = parsed.question || "";
        const completeSentences = finalQuestion.match(/[^.!?]+[.!?]+/g) || [];
        const emittedLength = completeSentences.join("").length;
        const remainingText = finalQuestion.substring(emittedLength).trim();
        if (remainingText && onSentence) {
          onSentence(remainingText);
        }

        return {
          raw: aiContent,
          parsed,
        };
      }

      default:
        throw new ApiError(
          400,
          "Unknown AI action"
        );
    }
  }

  return {
    sendMessage,
    messages: session.messages,
  };
}