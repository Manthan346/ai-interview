import { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import { prisma } from "../../lib/prisma";
import { authRequest } from "../../interfaces/auth.interface";
import { ApiResponse } from "../../helpers/ApiResponse";


const  getAllInterview = asyncHandler(async(req: authRequest, res: Response) => {
    const userId = req.user?.id
    // req.query values come in as strings (or ParsedQs). Parse to numbers with defaults.

    const page = parseInt((req.query.page as string) || "1", 10)
    const limit = parseInt((req.query.limit as string) || "10", 10)
    const skip = (page - 1) * limit
    
    if (!userId) {
        throw new ApiError(404, "user not found please login")
        
    }

    const userInterviews = await  prisma.interview.findMany({
    
        where: {userId: userId},
        skip: skip,
        take: limit,
        select: {
            id: true,
            role: true,
            experience: true,
            candidateName: true,
            createdAt: true,
            isCompleted: true
            
        },
        orderBy: {createdAt: "desc"}
        
        
        

    })

    const totalInterview = await prisma.interview.count()
    const totalPages = Math.ceil((totalInterview/limit))
    
    if (!userInterviews) {

        throw new ApiError(404, "no interview record for this user ")
        
    }
    return res.status(200).json(
        new ApiResponse(200, {
            totalInterview,
            totalPages,
            interviews: userInterviews

        }, "interview data found successfully")
    )
    





})

export {
    getAllInterview
}