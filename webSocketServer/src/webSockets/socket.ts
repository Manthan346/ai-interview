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
      next( new Error( "unauthorized"))
      return
    } 
     
    try {
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
    } catch (error) {
      next(new Error("Authentication failed"))
    }
  })
 

  io.on("connection", async (socket) => {
    console.log("Client connected");
    console.log("Socket ID:", socket.id);
    console.log("user", socket.data.user) 
    
    let user = socket.data.user
    let ttsConnection: any = null;
    let dgSocket: any = null;
    let interviewDetail: any = null;
    let interviewSession: any = null;
    let isCleaningUp = false;

    try {
      // Get interview details
      interviewDetail = await prisma.interview.findFirst({
        where: {
          userId: user.id
        },
        orderBy: {
          createdAt: "desc",
        }
      })
      
      if (!interviewDetail) {
        // Emit error and disconnect gracefully
        socket.emit("connection-error", {
          type: "INTERVIEW_NOT_FOUND",
          message: "Interview details not found. Please start a new interview.",
        });
        socket.disconnect();
        return;
      }

      // ============================================
      // IMPROVED TTS CONNECTION WITH ERROR HANDLING
      // ============================================
      try {
        console.log("Creating TTS connection...");
        ttsConnection = await createTTSConnection((audioData) => {
          socket.emit("audio-response", {
            audioData,
            sampleRate: 24000, 
            channels: 1,
          });
        });
        console.log("TTS connection established successfully");
        
        // Emit success event to client
        socket.emit("tts-ready", {
          status: "ready",
          message: "Text-to-speech service is ready"
        });
        
      } catch (ttsError: any) {
        console.error("Failed to create TTS connection:", ttsError);
        
        // Emit specific error event for TTS failure
        socket.emit("connection-error", {
          type: "TTS_CONNECTION_FAILED",
          message: "Text-to-speech service unavailable. Please try again later.",
          details: ttsError.message
        });
        
        // Clean up and disconnect
        socket.disconnect();
        return;
      }

      // ============================================
      // IMPROVED STT CONNECTION WITH ERROR HANDLING
      // ============================================
      try {
        console.log("Creating Deepgram STT connection...");
        
        dgSocket = await createDeepgramConnection(
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

              const numberOfQuestions = interviewDetail?.numberOfQuestions ?? 5;
              
              // Initialize interview session if not already created
              if (!interviewSession) {
                interviewSession = await createInterviewSession({
                  role: interviewDetail.role,
                  experience: interviewDetail.experience,
                  name: interviewDetail?.candidateName || "",
                  numberOfQuestions,
                  userId: user.id,
                  interviewId: interviewDetail.id,
                });
              }
              
              const sentences = await interviewSession.sendMessage(transcript, (sentence: string) => {
                try {
                  socket.emit("audio-response-start", sentence);
                  ttsConnection.speak(sentence);
                } catch (error: any) {
                  console.error("TTS speak error:", error);
                  socket.emit("error-message", {
                    interviewId: interviewDetail?.id,
                    type: "TTS_SPEAK_ERROR",
                    message: "Error generating speech response",
                    details: error.message
                  });
                }
              });

              // Handle end interview
              if (sentences?.parsed.action === "END_INTERVIEW") {
                socket.emit("interview-ended", {
                  interviewId: interviewDetail?.id,
                  message: "Interview has ended. Thank you!"
                });
                setTimeout(() => {
                  if (!isCleaningUp) {
                    socket.disconnect();
                  }
                }, 10000);
              }

              // Handle inappropriate behavior
              if (sentences?.parsed.action === "CANT_CONTINUE") {
                socket.emit("error-message", {
                  interviewId: interviewDetail?.id,
                  type: "INAPPROPRIATE_BEHAVIOR",
                  message: "Cannot continue interview due to inappropriate behavior",
                });
                setTimeout(() => {
                  if (!isCleaningUp) {
                    socket.disconnect();
                  }
                }, 10000);
              }

            } catch (error: any) {
              console.error("AI processing error:", error);
              socket.emit("error-message", {
                interviewId: interviewDetail?.id,
                type: "AI_PROCESSING_ERROR",
                message: "Failed to process transcript. Please try again.",
                details: error.message
              });
            }
          }
        );
        
        console.log("Deepgram STT connection established successfully");
        
        // Emit success event
        socket.emit("stt-ready", {
          status: "ready",
          message: "Speech-to-text service is ready"
        });
        
      } catch (sttError: any) {
        console.error("Failed to create Deepgram STT connection:", sttError);
        
        // Emit specific error event for STT failure
        socket.emit("connection-error", {
          type: "STT_CONNECTION_FAILED",
          message: "Speech-to-text service unavailable. Please try again later.",
          details: sttError.message
        });
        
        // Clean up TTS if it was created
        if (ttsConnection) {
          try {
            ttsConnection.close();
          } catch (closeError) {
            console.error("Error closing TTS after STT failure:", closeError);
          }
        }
        
        socket.disconnect();
        return;
      }

      // ============================================
      // AUDIO CHUNK HANDLING WITH ERROR HANDLING
      // ============================================
      socket.on("audio-chunk", (chunk) => {
        try {
          if (!dgSocket) {
            throw new Error("Deepgram socket not initialized");
          }
          
          if (dgSocket.readyState === 1) {
            dgSocket.sendMedia(chunk);
          } else {
            console.error("Deepgram socket not ready. ReadyState:", dgSocket.readyState);
            socket.emit("error-message", {
              interviewId: interviewDetail?.id,
              type: "STT_NOT_READY",
              message: "Speech-to-text service is not ready. Please wait.",
            });
          }
        } catch (error: any) {
          console.error("Audio send error:", error.message);
          socket.emit("error-message", {
            interviewId: interviewDetail?.id,
            type: "AUDIO_SEND_ERROR",
            message: "Failed to send audio. Please try again.",
            details: error.message
          });
        }
      });

 
      socket.on("disconnect", () => {
        console.log("Client disconnected");
        isCleaningUp = true;

        // Clean up STT connection
        if (dgSocket) {
          try {
            dgSocket.sendCloseStream({ 
              type: "CloseStream",
            });
          } catch (error: any) {
            console.error("Error sending close stream:", error.message);
          }

          try {
            dgSocket.close();
          } catch (error: any) {
            console.error("Error closing Deepgram socket:", error.message);
          }
        }

        // Clean up TTS connection
        if (ttsConnection) {
          try {
            ttsConnection.close();
          } catch (error: any) {
            console.error("Error closing TTS connection:", error.message);
          }
        }

        // Clean up interview session
        if (interviewSession) {
          try {
            // Assuming interviewSession has a close method
            if (typeof interviewSession.close === 'function') {
              interviewSession.close();
            }
          } catch (error: any) {
            console.error("Error closing interview session:", error.message);
          }
        }
      });

      // ============================================
      // ERROR EVENT HANDLING
      // ============================================
      socket.on("error", (error) => {
        console.error("Socket error from client:", error);
        socket.emit("error-message", {
          interviewId: interviewDetail?.id,
          type: "SOCKET_ERROR",
          message: "A socket error occurred. Please check your connection.",
          details: error
        });
      });

    } catch (error: any) {
      // Catch any unhandled errors in the connection setup
      console.error("Unhandled error in connection setup:", error);
      
      socket.emit("connection-error", {
        type: "CONNECTION_SETUP_ERROR",
        message: "Failed to initialize interview connection. Please refresh the page.",
        details: error.message
      });
      
      // Clean up any connections that were established
      if (ttsConnection) {
        try { ttsConnection.close(); } catch (e) {}
      }
      if (dgSocket) {
        try { dgSocket.close(); } catch (e) {}
      }
      
      socket.disconnect();
    }

    // Connect error handler
    socket.on("connect_error", (err) => { 
      console.log("Socket connection error:", err.message);
      socket.emit("error-message", {
        interviewId: interviewDetail?.id,
        type: "CONNECTION_ERROR",
        message: "Socket connection error. Please refresh the page.",
        details: err.message
      });
    });
  });

  return io;
};