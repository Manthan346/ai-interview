// import { DeepgramClient } from "@deepgram/sdk";

// export async function DeepgramTTS(text: string): Promise<Buffer> {
//   const client = new DeepgramClient();

//   console.log("Text being sent to TTS:", JSON.stringify(text)); // confirm text is non-empty

//   const connection = await client.speak.v1.createConnection({
//     model: "aura-asteria-en",
//     encoding: "linear16",
//     sample_rate: 24000,
//   });

//   const audioChunks: Buffer[] = [];

//   return new Promise((resolve, reject) => {
//     connection.on("message", (data: any) => {
//       if (data instanceof ArrayBuffer || Buffer.isBuffer(data)) {
//         const chunk = data instanceof ArrayBuffer ? Buffer.from(data) : (data as Buffer);
//         console.log("Audio chunk received, size:", chunk.length);
//         audioChunks.push(chunk);
//       } else if (typeof data === "object" && data.type === "Flushed") {
//         console.log("Flushed received. Chunks so far:", audioChunks.length);

//         // Increase wait to 1000ms to collect any in-flight chunks
//         setTimeout(() => {
//           console.log("Total chunks:", audioChunks.length);
//           const pcm = Buffer.concat(audioChunks);
//           console.log("PCM size:", pcm.length);

//           const header = Buffer.alloc(44);
//           const dataSize = pcm.length;
//           header.write("RIFF", 0);
//           header.writeUInt32LE(36 + dataSize, 4);
//           header.write("WAVE", 8);
//           header.write("fmt ", 12);
//           header.writeUInt32LE(16, 16);
//           header.writeUInt16LE(1, 20);
//           header.writeUInt16LE(1, 22);
//           header.writeUInt32LE(24000, 24);
//           header.writeUInt32LE(24000 * 2, 28);
//           header.writeUInt16LE(2, 32);
//           header.writeUInt16LE(16, 34);
//           header.write("data", 36);
//           header.writeUInt32LE(dataSize, 40);

//           const wav = Buffer.concat([header, pcm]);
//           connection.close();
//           resolve(wav);
//         }, 1000); // increased from 300ms to 1000ms
//       } else if (typeof data === "object" && data.type === "Metadata") {
//         console.log("TTS Metadata received:", data);
//       }
//     });

//     connection.on("error", (err: any) => {
//       console.error("TTS Error:", err);
//       reject(err);
//     });

//     connection.connect();
//     connection.waitForOpen()
//       .then(() => {
//         console.log("TTS connection open, sending text...");
//         connection.sendText({ type: "Speak", text });
//         connection.sendFlush({ type: "Flush" });
//       })
//       .catch(reject);
//   });
// }

import { DeepgramClient } from "@deepgram/sdk";

export async function DeepgramTTS(text: string): Promise<Buffer> {
  const client = new DeepgramClient();

  const response = await client.speak.v1.audio.generate({
    text,
    model: "aura-2-athena-en",
    encoding: "linear16",
    container: "wav",
    sample_rate: 16000,
  });

  // Stream chunks as they arrive instead of waiting for full response
  const stream = response.stream();
  const reader = stream!.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}



// import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
// import 'dotenv/config';
// const elevenlabs = new ElevenLabsClient();
// const audio = await elevenlabs.textToSpeech.convert(
//   'JBFqnCBsd6RMkjVDRZzb', // "George" - browse voices at elevenlabs.io/app/voice-library
//   {
//     text: 'The first move is what sets everything in motion.',
//     modelId: 'eleven_v3',
//     outputFormat: 'mp3_44100_128',
//   }
// );
// await play(audio);