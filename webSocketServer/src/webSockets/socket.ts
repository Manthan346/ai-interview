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
      throw new ApiError(404, "interview details not found");
    }

    const systemPrompt = createVoiceAgentPrompt({
      role: interviewDetail.role,
      experience: interviewDetail.experience,
      name: interviewDetail.candidateName,
    });

    // Array to collect conversation history for final evaluation
    const conversationHistory: any[] = [];

    // Create Deepgram Agent Connection
    let dgAgent: any = null;
    try {
      dgAgent = await createDeepgramAgentConnection(
        systemPrompt,
        (buffer: Buffer) => {
          // AI speaking audio chunk
          socket.emit("audio-response", buffer);
          console.log(buffer)
        },
        
        (data: any) => {
          // Collect transcripts
          conversationHistory.push({
            role: data.role,
            content: data.content,
          });
          
          if (data.role === "assistant") {
             // Let the frontend know what the AI said in text form if needed
             socket.emit("transcript", {
               type: "transcript",
               text: data.content,
               final: true,
             });
          }
        },
        () => {
          // User interrupted the AI
          socket.emit("clear-audio");
        },
        () => {
          // Agent finished speaking
        },
        () => {
          console.log("Agent connection closed");
        }
      );
    } catch (error) {
      console.log("Failed to connect to Deepgram Agent:", error);
      socket.emit("error-message", "Failed to connect to Voice Agent");
    }

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