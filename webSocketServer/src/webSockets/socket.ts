import { WebSocketServer } from "ws";
import { createDeepgramConnection } from "../services/deepgramSTT";
import { getGroqChatCompletion } from "../services/LLMCalling";
import { DeepgramTTS } from "../services/deepgramTTS";
import { APIError } from "groq-sdk";
import { send } from "node:process";
import { asyncHandler } from "../helpers/asyncHandler";
import { ApiError } from "../helpers/ApiError";

export const startSocket = (server: any) => {

  
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws) => {
    console.log("client connected");
     

    const dgSocket = await createDeepgramConnection();

    // Receive transcript from Deepgram
    dgSocket.on("message",async (data: any) => {
      try {
        const res = typeof data === "string" ? JSON.parse(data) : data;

        if (
          res.type === "Results" &&
          res.channel?.alternatives?.[0]?.transcript
        ) {
          const transcript = res.channel.alternatives[0].transcript;
          const isFinal = res.is_final;

          const utterenceEnd = res.utterenceEnd

          console.log(res)
          console.log(isFinal ? " FINAL:" : "⏳ Interim:", transcript);
          
             if (isFinal ) {
          const response = await getGroqChatCompletion(transcript)
          console.log(response)
         
     const sentences = response!.match(/[^.!?]+[.!?]+/g) || [response];
for (const sentence of sentences) {
  const wav = await DeepgramTTS(sentence!.trim());
  ws.send(wav);
      console.log("finalvoice",wav)
}
    

      
              console.log("final voice sent",)
        
          
          
          

            
          }

    
         

          // Send back to frontend
          ws.send(
            JSON.stringify({
              type: "transcript",
              text: transcript,
              final: isFinal,

            })
          );
        }
      } catch (err: any) {
        new ApiError(404,err.message)
      }
    }); 

    dgSocket.on("close", () => {
      console.log(" Deepgram closed");
    });

    dgSocket.on("error", (err: any) => {
      console.log(" Deepgram error", err);
    });

    //  Receive audio from frontend send to Deepgram
    ws.on("message", (chunk) => {
      if (dgSocket.readyState === 1) {
        dgSocket.sendMedia(chunk as ArrayBufferLike);
      }
    });

    ws.on("close", () => {
      console.log("❌ Client disconnected");
      try { dgSocket.sendCloseStream({ type: "CloseStream" }); } catch {}
      try { dgSocket.close(); } catch {}
    });

    ws.on("error", (err) => {
      console.log("❌ WS error", err);
    });
  });
};