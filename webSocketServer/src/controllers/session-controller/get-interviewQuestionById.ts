import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import { prisma } from "../../lib/prisma";

import { ApiResponse } from "../../helpers/ApiResponse";
import { Response, Request } from "express";


const getInterviewQuestionsById = asyncHandler(async(req: Request, res: Response) => {
    const interviewId = req.params.interviewId as string
    
    if (!interviewId) {
        throw new ApiError(404, "interview id not found")
    }
    const questions = await prisma.question.findMany({
        where: {interviewId: interviewId},
        
    })

    return res.status(200).json(
        new ApiResponse(200, {
            questions
        }, "interview evaluation found successfully")
    )

})

export {
    getInterviewQuestionsById
}