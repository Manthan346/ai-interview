// import { DeepgramClient } from "@deepgram/sdk";

// export async function DeepgramTTS(text: string): Promise<Buffer> {
//   const client = new DeepgramClient();

//   const connection = await client.speak.v1.createConnection({
//     model: "aura-2-thalia-en",
//     encoding: "linear16",
//     sample_rate: 24000,
//   });

//   const audioChunks: Buffer[] = [];

//   return new Promise((resolve, reject) => {
//     connection.on("message", (data: ArrayBuffer | { type: string }) => {
//       if (data instanceof ArrayBuffer || Buffer.isBuffer(data)) {
//         const chunk = data instanceof ArrayBuffer ? Buffer.from(data) : data as Buffer;
//         console.log("Audio chunk received, size:", chunk.length);
//         audioChunks.push(chunk);
//       } else if (typeof data === "object" && (data as any).type === "Flushed") {
//         console.log("Flushed received. Waiting briefly for in-flight chunks...");

//         // Wait 300ms to collect any chunks still in-flight
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
//           header.writeUInt16LE(1, 20);        // PCM
//           header.writeUInt16LE(1, 22);        // Mono
//           header.writeUInt32LE(24000, 24);    // Sample rate
//           header.writeUInt32LE(24000 * 2, 28); // Byte rate
//           header.writeUInt16LE(2, 32);        // Block align
//           header.writeUInt16LE(16, 34);       // Bits per sample
//           header.write("data", 36);
//           header.writeUInt32LE(dataSize, 40);

//           const wav = Buffer.concat([header, pcm]);
//           connection.close();
//           resolve(wav);
//         }, 300);
//       }
//     });

//     connection.on("error", (err: any) => {
//       console.error("Error:", err);
//       reject(err);
//     });

//     connection.connect();
//     connection.waitForOpen().then(() => {
//       connection.sendText({ type: "Speak", text });
//       connection.sendFlush({ type: "Flush" });
//     }).catch(reject);
//   });
// }


import { DeepgramClient } from "@deepgram/sdk";

export async function DeepgramTTS(text: string): Promise<Buffer> {
  const client = new DeepgramClient();

  const response = await client.speak.v1.audio.generate({
    text,
    model: "aura-2-thalia-en",
    encoding: "linear16",
    container: "wav",
    sample_rate: 24000,
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