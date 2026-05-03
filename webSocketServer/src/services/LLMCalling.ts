import Groq from "groq-sdk";
import { createSystemPrompt } from "../prompt.js";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.js";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// create messages per interview session
export function createInterviewSession({
  name,
  experience,
  role,
}: {
  name: string;
  experience: string;
  role: string;
}) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: createSystemPrompt({ name, experience, role }),
    },
  ];

  // function to send messages
  async function sendMessage(text: string) {
    messages.push({
      role: "user",
      content: text,
    });

    const res = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages,
      tool_choice: "none",
    });

    const aiReply = res.choices[0].message;

    messages.push({
      role: "assistant",
      content: aiReply.content,
    });

    console.log("AI:", aiReply.content);

    return aiReply.content;
  }

  return {
    sendMessage,
    messages, // optional (debug / memory)
  };
}