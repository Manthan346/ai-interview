import { DeepgramClient } from "@deepgram/sdk";

export const createDeepgramConnection = async () => {
  const deepgram = new DeepgramClient({
    apiKey: process.env.DEEPGRAM_API_KEY!,
  });

  const dgSocket = await deepgram.listen.v1.createConnection({
    model: "nova-3",
    language: "en",
    smart_format: "true", 
    interim_results: "true",
    endpointing: 100,
     
    
     keyterm: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "TypeScript", "JavaScript", "REST API", "GraphQL"],
  });

  // Set up event handlers before connecting
  dgSocket.on("open", () => console.log(" Connection opened"));

  dgSocket.on("message", (data: any) => {
    if (data.type === "Results" && data.is_final) {
      const transcript = data.channel?.alternatives?.[0]?.transcript;
      if (transcript) console.log("Transcript:", transcript);
    }
  });

  dgSocket.on("error", (err: any) => console.error("Error:", err));
  dgSocket.on("close", () => console.log("deepgram Connection closed"));

  // Connect      
  dgSocket.connect();
  await dgSocket.waitForOpen();

  console.log(" Deepgram connected");

  return dgSocket;
};