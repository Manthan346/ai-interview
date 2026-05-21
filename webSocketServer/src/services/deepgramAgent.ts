import { DeepgramClient } from "@deepgram/sdk";
import dotenv from "dotenv";

dotenv.config();

const deepgram = new DeepgramClient({ apiKey: process.env.DEEPGRAM_API_KEY! });

export const createDeepgramAgentConnection = async (
  systemPrompt: string,
  onAudioData: (buffer: Buffer) => void,
  onConversationText: (data: any) => void,
  onUserStartedSpeaking: () => void,
  onAgentAudioDone: () => void,
  onClose: () => void
) => {
  const connection = await deepgram.agent.v1.createConnection();

  let keepAliveInterval: ReturnType<typeof setInterval> | undefined;

  connection.on("open", () => {
    console.log("Deepgram Agent Connection opened");
  });

  connection.on("message", (data: any) => {
    if (data.type === "ConversationText") {
      onConversationText(data);
    } else if (data.type === "UserStartedSpeaking") {
      onUserStartedSpeaking();
    } else if (data.type === "AgentAudioDone") {
      onAgentAudioDone();
    } else if (Buffer.isBuffer(data) || data instanceof Uint8Array) {
      // Audio data arrives as a Buffer or Uint8Array
      onAudioData(Buffer.isBuffer(data) ? data : Buffer.from(data));
    }
  });

  connection.on("close", () => {
    console.log("Deepgram Agent Connection closed");
    if (keepAliveInterval) {
      clearInterval(keepAliveInterval);
    }
    onClose();
  });

  connection.on("error", (err: any) => {
    console.error("Deepgram Agent Error:", err.message || err);
  });

  connection.connect();
  await connection.waitForOpen();

  // Send settings immediately after connection opens
  connection.sendSettings({
    type: "Settings",
    audio: {
      input: {
        encoding: "linear16",
        sample_rate: 16000,
      },
      output: {
        encoding: "linear16",
        sample_rate: 24000,
      },
    },
    agent: {
      language: "en",
      listen: {
        provider: {
          type: "deepgram",
          model: "nova-3",
        },
      },
      think: {
        provider: {
          type: "open_ai",
          model: "gpt-4o-mini",
        },
        prompt: systemPrompt,
      },
      speak: {
        provider: {
          type: "deepgram",
          model: "aura-2-thalia-en",
        },
      },
    },
  } as any);

  console.log("Deepgram agent configured!");

  keepAliveInterval = setInterval(() => {
    if (connection.socket.readyState === 1) { // 1 = OPEN
      connection.sendKeepAlive({ type: "KeepAlive" });
    }
  }, 5000);

  return connection;
};