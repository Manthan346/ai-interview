import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { createDeepgramAgentConnection } from "../services/deepgramAgent";
import { evaluateInterviewSession } from "../services/LLMCalling";
import { createVoiceAgentPrompt } from "../prompt";
import { TokenPayload } from "../interfaces/jwt.interface";
import { prisma } from "../lib/prisma";
import { ApiError } from "../helpers/ApiError";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const startSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const cookies = socket.handshake.headers.cookie || "";
    const parsedCookie = cookie.parse(cookies);
    const token = parsedCookie.accessToken;
    if (!token) {
      next(new ApiError(401, "unauthorized"));
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    const user = await prisma.user.findFirst({
      where: { id: decoded.id },
    });
    if (!user || !user.isVerified) {
      next(new ApiError(404, "user not found or not verified"));
      return;
    }
    socket.data.user = user;
    next();
  });

  io.on("connection", async (socket) => {
    console.log("Client connected, Socket ID:", socket.id);
    const user = socket.data.user;
    console.log(user)

    const interviewDetail = await prisma.interview.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!interviewDetail) {
      throw new ApiError(404, "interview details not found")
      
    }
    
   

    //creating stt connection 
    const dgSocket = await createDeepgramConnection(
      async (transcript: string) => { 
        try {
          console.log("Processing complete utterance:", transcript);
          socket.emit("ai-thinking");

          const response = await createInterviewSession({
            role: interviewDetail!.role,
            experience: interviewDetail!.experience,
            name: interviewDetail?.candidateName,
            userId: user.id,
            interviewId: interviewDetail!.id
          });
          //breaking the response into multiple piceses using (.)
          const sentences =
            await response.sendMessage(transcript)

let finalQuestion = "";

switch (sentences.parsed.action) {
  case "ASK_QUESTION":
  case "FOLLOW_UP":
    finalQuestion = sentences.parsed.question;
    break;

  case "END_INTERVIEW": 
    socket.disconnect();
    break;
}

  if (finalQuestion.trim()) {
    await DeepgramTTS(finalQuestion.trim(), (audioData) => {
      socket.emit("audio-response", audioData);
    });
  }


         

          // send transcript
          socket.emit("transcript", {
            type: "transcript",
            text: transcript,
            final: true,
          });
        } catch (error) {
          console.log("AI processing error:", error);
          socket.emit("error-message", "Failed to process transcript");
        }
      }
    );

    // receive audio from frontend
   socket.on("audio-chunk", (chunk) => {
  try {
    if (dgAgent) {
      dgAgent.sendMedia(chunk);
    }
  } catch (error) {
    console.log("Audio send error:", error);
  }
});

    socket.on("disconnect", async () => {
      console.log("Client disconnected");
      
      try {
        if (dgAgent) {
          dgAgent.close()
        }
      } catch {}

      // Evaluate interview on call end
      if (conversationHistory.length > 0) {
        try {
          await evaluateInterviewSession(conversationHistory, {
            role: interviewDetail.role,
            experience: interviewDetail.experience,
            name: interviewDetail.candidateName,
            userId: user.id,
            interviewId: interviewDetail.id,
          });
        } catch (error) {
          console.error("Failed to evaluate interview transcript:", error);
        }
      }
    });

    socket.on("connect_error", (err) => {
      console.log("Socket error:", err);
    });
  });

  return io;
};