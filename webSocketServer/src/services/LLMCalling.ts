import Groq from "groq-sdk";
import { createSystemPrompt } from "../prompt.js";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.js";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../helpers/ApiError.js";
import { AIAction } from "../types/interview-actions.types.js";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
interface sessionDetail {
   name: string;
  experience: string;
  role: string;
  userId: string
}

// create messages per interview session
export async function createInterviewSession({
  name,
  experience,
  role,
  userId
}: sessionDetail) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: createSystemPrompt({ name, experience, role }),
    },
  ];

  //fetching latest interview details of user from db
   const interviewDetail = await prisma.interview.findFirst({
        where: {
            userId: userId
        },
        orderBy: {
          createdAt: "desc",
        }
        
    })

  

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
     if (!interviewDetail)  throw new ApiError(404, "interview detail not found")

    const aiReply = res.choices[0].message;
    const parse : AIAction = JSON.parse(aiReply.content!)
    console.log("parsed content",parse)
    switch (parse.action) {
      case "ASK_QUESTION":
        messages.push({
          role: "assistant",
          content: aiReply.content,
        });

 
    
        
        // storing the questions in db 
       const questions =   await prisma.question.create({
          data: {
            questions: parse.question,
            interviewId: interviewDetail.id,
          },
        })
        console.log("questions", parse.question)
        break;
      case "FOLLOW_UP":
        messages.push({
          role: "assistant",
          content: aiReply.content,
        });
       
      
        console.log("followUpQuestion", parse.question)
        break;
      case "SAVE_ANSWER":
        messages.push({
          role: "assistant",
          content: aiReply.content,
        });

        //save answer to db
     const saveAnswer =   await prisma.answer.create({
          data: {
            userAnswerSummary: parse.userAnswerSummary,
            questionId: questions!.id,
            expectedAnswer: parse.expectedAnswer,
            score: parse.score

            

            
        
          },
        })
        console.log("answer", saveAnswer)
        break;
        case "END_INTERVIEW": 
        messages.push({
          role: "assistant",
          content: aiReply.content,
        });
        await prisma.interview.update({
          where: {id: interviewDetail.id},
          data: {
            overallScore: parse.overallScore,
            summary: parse.summary,
            strengths: parse.strengths,
            weaknesses: parse.weaknesses,
            improvements: parse.improvements,
            selectionChances: parse.selectionChances

          }

        })

      default:
        messages.push({
          role: "assistant",
          content: aiReply.content,
        });
    }
    

    

 console.log("messages", messages)



    return {
     raw: aiReply.content,
     parse

    };
  }

  return {
    sendMessage,
    
    
    messages, // optional (debug / memory)
  };
}