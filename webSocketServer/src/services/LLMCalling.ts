import Groq from "groq-sdk";
import { createEvaluationPrompt } from "../prompt.js";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../helpers/ApiError.js";
import { AIAction } from "../types/interview-actions.types.js";

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

export async function evaluateInterviewSession(
  transcript: any[],
  sessionDetail: SessionDetail
) {
  const { name, experience, role, interviewId } = sessionDetail;

  const interviewDetail = await prisma.interview.findUnique({
    where: { id: interviewId },
  });

  if (!interviewDetail) {
    throw new ApiError(404, "Interview detail not found");
  }

  const systemPrompt = createEvaluationPrompt({ name, experience, role });

  // Format the transcript nicely for Groq
  const formattedTranscript = transcript
    .map((msg) => `${msg.role === "assistant" ? "Assistant" : "User"}: ${msg.content}`)
    .join("\n\n");

  const messages: any[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Here is the full interview transcript:\n\n${formattedTranscript}` },
  ];

  console.log("Evaluating interview transcript with Groq...");

  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", // Using a stable 70b model for high quality eval
    messages,
    response_format: { type: "json_object" },
  });

  const aiContent = res.choices[0].message.content;

  if (!aiContent) {
    throw new ApiError(500, "AI returned empty response");
  }

  let parsed: AIAction;

  try {
    parsed = JSON.parse(aiContent) as AIAction;
  } catch {
    throw new ApiError(500, "AI response is not valid JSON");
  }

  if (parsed.action === "END_INTERVIEW") {
    await prisma.interview.update({
      where: { id: interviewId },
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

    if (parsed.questionEvaluations && parsed.questionEvaluations.length > 0) {
      await prisma.question.createMany({
        data: parsed.questionEvaluations.map((ev) => ({
          interviewId: interviewId,
          questions: ev.question,
          userAnswerSummary: ev.userAnswerSummary,
          expectedAnswer: ev.expectedAnswer,
          score: ev.score,
          feedback: ev.feedback,
          whatWasMissing: ev.whatWasMissing,
          whatInterviewersWouldThink: ev.whatInterviewersWouldThink,
          betterAnswerOutline: ev.betterAnswerOutline,
        })),
      });
    }

    console.log(`Interview ${interviewId} evaluated successfully.`);
    return parsed;
  } else {
    throw new ApiError(400, "Unknown AI action from evaluation");
  }
}