// startSocket.ts
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import { createDeepgramConnection } from "../services/deepgramSTT";
import { getGroqChatCompletion } from "../services/LLMCalling";
import { DeepgramTTS } from "../services/deepgramTTS";

export const startSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // change to frontend URL in production
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  console.log(io)

  io.on("connection", async (socket) => {
    console.log("Client connected");
    console.log("Socket ID:", socket.id);

    //creating stt connection 
    const dgSocket = await createDeepgramConnection(
      async (transcript: string) => {
        try {
          console.log("Processing complete utterance:", transcript);

          const response = await getGroqChatCompletion(transcript);
          //breaking the response into multiple piceses using (.)
          const sentences =
            response?.match(/[^.!?]+[.!?]+/g) || [response];

          for (const sentence of sentences) {
            const wav = await DeepgramTTS(sentence!.trim());

            // send audio chunk to frontend
            socket.emit("audio-response", wav);
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
      } catch {}

      try {
        dgSocket.close();
      } catch {}
    });

    socket.on("connect_error", (err) => {
      console.log("Socket error:", err);
    });
  });

  return io;
};