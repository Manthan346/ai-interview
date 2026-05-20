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
  userId: string;
  interviewId: string;
}

type InterviewSessionState = {
  messages: ChatCompletionMessageParam[];
};

const interviewSessions = new Map<string, InterviewSessionState>();

export async function createInterviewSession({
  name,
  experience,
  role,
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
          }),
        },
      ],
    };

    interviewSessions.set(interviewId, session);
  }

  async function sendMessage(text: string) {

    // push user message
    session!.messages.push({
      role: "user",
      content: text,
    });

    // ai response
    const res = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: session!.messages,

      response_format: { 
        type: "json_object",
      },
    });

    const aiContent = res.choices[0].message.content; 

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

      // new question
      case "ASK_QUESTION": {
        return {
          raw: aiContent,
          parsed,
        };
      }

      // follow up question
      case "FOLLOW_UP": {
        return {
          raw: aiContent,
          parsed,
        };
      }

      // end interview
      case "END_INTERVIEW": {

        await prisma.interview.update({
          where: {
            id: interviewDetail!.id,
          },

          data: {
            overallScore: parsed.overallScore,
            summary: parsed.summary,
            strengths: parsed.strengths,
            weaknesses: parsed.weaknesses,
            improvements: parsed.improvements,
            finalInterviewVerdict: parsed.finalInterviewVerdict,
            candidatePerspective: parsed.candidatePerspective,
            selectionChances: parsed.selectionChances,
          },
        }); 

        // batch save question evaluations 
        if (parsed.questionEvaluations && parsed.questionEvaluations.length > 0) {
          await prisma.question.createMany({
            data: parsed.questionEvaluations.map(ev => ({
              interviewId: interviewDetail!.id, 
              questions: ev.question,
              userAnswerSummary: ev.userAnswerSummary,
              expectedAnswer: ev.expectedAnswer,
              score: ev.score, 
              feedback: ev.feedback,
              whatWasMissing: ev.whatWasMissing,
              whatInterviewersWouldThink: ev.whatInterviewersWouldThink,
              betterAnswerOutline: ev.betterAnswerOutline
            }))
          });
        }

        // clear memory
        interviewSessions.delete(interviewId);

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