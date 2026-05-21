// startSocket.ts
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { createDeepgramConnection } from "../services/deepgramSTT";
import { createInterviewSession } from "../services/LLMCalling";
import { createTTSConnection } from "../services/deepgramTTS";
import { TokenPayload } from "../interfaces/jwt.interface";
import {prisma} from "../lib/prisma"
import { ApiError } from "../helpers/ApiError";
import jwt from "jsonwebtoken"
import cookie from "cookie"

export const startSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // change to frontend URL in production
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  
  io.use(async (socket, next) => {
    const cookies =  socket.handshake.headers.cookie || ""
    const parsedCookie = cookie.parse(cookies) 
    const token = parsedCookie.accessToken
    console.log(token)
  if (!token) {
    next( new ApiError(401, "unauthorized"))
    return
  } 
     
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
    const user = await prisma.user.findFirst({
        where : {
            id: decoded.id
        }
    }) 
    if (!user || !user.isVerified) { 
        throw new ApiError(404, "user not found or not verified")
        
    } 

    socket.data.user = user
    next()
    
  })
 

  io.on("connection", async (socket) => {
    console.log("Client connected");
    console.log("Socket ID:", socket.id);
    console.log("user", socket.data.user) 
    const user = socket.data.user

    const interviewDetail = await prisma.interview.findFirst({
        where: {
            userId: user.id
        },
        orderBy: {
          createdAt: "desc",
        }
        
    })
    if (!interviewDetail) {
      throw new ApiError(404, "interview details not found")
      
    }
    
   

    // create persistent TTS connection
    const ttsConnection = await createTTSConnection((audioData) => {
      socket.emit("audio-response", {
        audioData,
        sampleRate: 24000,
        channels: 1,
      });
    });

    //creating stt connection 
    const dgSocket = await createDeepgramConnection(
      async (transcript: string) => { 
        try {
          // send transcript immediately
          socket.emit("transcript", {
            type: "transcript",
            text: transcript,
            final: true,
          });
          socket.emit("ai-thinking");

          console.log("Processing complete utterance:", transcript);

          const response = await createInterviewSession({
            role: interviewDetail!.role,
            experience: interviewDetail!.experience,
            name: interviewDetail?.candidateName,
            userId: user.id,
            interviewId: interviewDetail!.id
          });
          const sentences = await response.sendMessage(transcript, (sentence) => {
            ttsConnection.speak(sentence);
          });

          if (sentences.parsed.action === "END_INTERVIEW") {
            socket.disconnect();
          }


         

        } catch (error) {
          console.log("AI processing error:", error);
          socket.emit("error-message", "Failed to process transcript");
        }
      }
    );

    // receive audio from frontend
    socket.on("audio-chunk", (chunk) => {
      try { 
        if (dgSocket.readyState === 1) {
          dgSocket.sendMedia(chunk);
        }
      } catch (error) {
        console.log("Audio send error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");

      try {
        dgSocket.sendCloseStream({ 
          type: "CloseStream",
        });
      } catch(error: any) {
        throw new ApiError(400, error.message)

      }

      try {
        dgSocket.close();
      } catch(error: any) {
        throw new ApiError(400, error.message)

      }

      try {
        ttsConnection.close();
      } catch(error: any) {
        throw new ApiError(400, error.message)

      }
    });

    socket.on("connect_error", (err) => { 
      console.log("Socket error:", err.message);
    });
  });

  return io;
};