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
    endpointing: 500,         // keep under 1000ms for reliability
    utterance_end_ms: "2000", // primary end-of-utterance signal
    keyterm: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "TypeScript", "JavaScript", "REST API", "GraphQL"],
  });

  let finalResult = "";
  let speechFinal = false;

  dgSocket.on("open", () => console.log("Connection opened"));

  dgSocket.on("message", async (data: any) => {
    if (data.type === "UtteranceEnd") {
      if (!speechFinal && finalResult.trim().length > 0) {
        console.log("UtteranceEnd — user finished speaking:", finalResult.trim());
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
          console.log("speech_final — user finished speaking:", finalResult.trim());
          await onUtteranceComplete(finalResult.trim());
          finalResult = "";
        }
        // else: keep accumulating — user is still talking
      }
    }
  });

  dgSocket.on("error", (err: any) => console.error("Error:", err));
  dgSocket.on("close", () => console.log("Deepgram connection closed"));

  dgSocket.connect();
  await dgSocket.waitForOpen();

  console.log("Deepgram connected");
  return dgSocket;
};