import Groq from "groq-sdk";
import { systemPrompt } from "../prompt.js";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.js";
import dotenv from 'dotenv'


dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY})


const messages: ChatCompletionMessageParam[]= [
  {
    role: "system",
    content: systemPrompt
  }, 
  
]

 



export async function getGroqChatCompletion(text: string) {
  messages.push({
    role: "user",
    content: text
  })


 const res = await groq.chat.completions.create({
  tool_choice: "none",



   messages,
    model: "openai/gpt-oss-20b",
  });
  const aiReply = (await res).choices[0].message





  messages.push({
    role: "assistant",
    content: aiReply.content
  })
  console.log(aiReply.content)

  return aiReply.content

  
  
}
