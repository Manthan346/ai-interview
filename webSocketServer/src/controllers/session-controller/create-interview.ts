import { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import { prisma } from "../../lib/prisma";
import { authRequest } from "../../interfaces/auth.interface";
import { ApiResponse } from "../../helpers/ApiResponse";

const createSession = asyncHandler(async(req: authRequest, res: Response) => {
    const { candidateName, experience, role, numberOfQuestions } = req.body
    const userId = req.user?.id


    const sessionDetail = await prisma.interview.create({
        data: {
            candidateName,
            experience,
            role,
            numberOfQuestions,
            userId
        }
    })
 
    return res.status(200).json(
        new ApiResponse(200, {
            sessionDetail
        }, "session created successfully")
    )
    
}) 


export {
    createSession
} 