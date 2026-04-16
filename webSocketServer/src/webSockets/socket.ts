// startSocket.ts
import { WebSocketServer } from "ws";
import { createDeepgramConnection } from "../services/deepgramSTT";
import { getGroqChatCompletion } from "../services/LLMCalling";
import { DeepgramTTS } from "../services/deepgramTTS";

export const startSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {

    console.log("client connected");
    console.log(req.url)

    const dgSocket = await createDeepgramConnection(async (transcript) => {
      // This only fires when the user has truly finished speaking
      console.log("Processing complete utterance:", transcript);

      const response = await getGroqChatCompletion(transcript);
      const sentences = response!.match(/[^.!?]+[.!?]+/g) || [response];
      for (const sentence of sentences) {
        const wav = await DeepgramTTS(sentence!.trim());
        ws.send(wav);
      }

      // Also send transcript to frontend
      ws.send(JSON.stringify({ type: "transcript", text: transcript, final: true }));
    });

    // Forward audio from frontend to Deepgram
    ws.on("message", (chunk) => {
      if (dgSocket.readyState === 1) {
        dgSocket.sendMedia(chunk as ArrayBufferLike);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected"); 
      try { dgSocket.sendCloseStream({ type: "CloseStream" }); } catch {}
      try { dgSocket.close(); } catch {}
    });

    ws.on("error", (err) => console.log("WS error", err));
  });
};