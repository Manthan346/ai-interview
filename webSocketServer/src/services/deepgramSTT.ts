import { DeepgramClient } from "@deepgram/sdk";

export const createDeepgramConnection = async (
  onUtteranceComplete: (transcript: string) => Promise<void>
) => {
  const deepgram = new DeepgramClient({
    apiKey: process.env.DEEPGRAM_API_KEY!,
  });

  const dgSocket = await deepgram.listen.v1.createConnection({
    model: "nova-3",
    language: "en",
    interim_results: "true",
    endpointing: 300,
    utterance_end_ms: "1000", 
    keyterm: [
      "MERN Stack",
      "React",
      "Node.js", 
      "Express",
      "MongoDB", 
      "TypeScript", 
      "JavaScript",
      "REST API",
      "GraphQL",
    ],
  });
 
  let finalResult = "";
  let speechFinal = false;

  // --- KEEPALIVE SETUP (NEW) ---
  let keepAliveInterval: ReturnType<typeof setInterval> | undefined;

  dgSocket.on("open", () => {
    console.log("Connection opened");

    // Send KeepAlive every 5 seconds while socket is open
    keepAliveInterval = setInterval(() => {
      if (dgSocket.readyState === 1) {
        try {
          dgSocket.sendKeepAlive({ type: "KeepAlive" });
          // console.log("[Keepalive] sent");
        } catch (err) { 
          console.error("KeepAlive error:", err);
        }
      } else if (keepAliveInterval) { 
        clearInterval(keepAliveInterval);
        keepAliveInterval = undefined;
      }
    }, 5000);
  });
  // --- END KEEPALIVE SETUP ---

  dgSocket.on("message", async (data: any) => {
    if (data.type === "UtteranceEnd") {
      if (!speechFinal && finalResult.trim().length > 0) {
        console.log(
          "UtteranceEnd — user finished speaking:",
          finalResult.trim()
        );
        await onUtteranceComplete(finalResult.trim());
        finalResult = "";
      }
      speechFinal = false;
      return;
    }

    if (data.type === "Results" && data.is_final) {
      const transcript = data.channel?.alternatives?.[0]?.transcript;
      if (transcript && transcript.trim().length > 0) {
        finalResult += ` ${transcript}`;

        if (data.speech_final) {
          speechFinal = true;
          console.log(
            "speech_final — user finished speaking:",
            finalResult.trim()
          );
          await onUtteranceComplete(finalResult.trim());
          finalResult = "";
        }
      }
    }
  });

  dgSocket.on("error", (err: any) => console.error("Error:", err));

  dgSocket.on("close", () => {
    console.log("Deepgram connection closed");
    if (keepAliveInterval) {
      clearInterval(keepAliveInterval);
      keepAliveInterval = undefined;
    }
  });

  dgSocket.connect();
  await dgSocket.waitForOpen();  
  console.log("Deepgram connected");

  return dgSocket;
};