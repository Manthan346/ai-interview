import { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import { prisma } from "../../lib/prisma";
import { authRequest } from "../../interfaces/auth.interface";
import { ApiResponse } from "../../helpers/ApiResponse";



const getInterviewOptions = asyncHandler(async(req: Request, res: Response) => {
   
    // fetching all roles in single endpoint use promise.all
    const  [getNumberOfQuestion, getRoles, getExperience] = await Promise.all([
         prisma.numberOfQuestion.findMany({
            select: {
                id: true,
                NumberOfQuestion: true
            }
         }),

         prisma.roles.findMany({
           select: {
                id: true,
                role: true
            }
         }),
         
         prisma.yearOfExperience.findMany({
           select: {
                id: true,
                experience: true
            }
         })

    ])

    return res.status(200).json(
        new ApiResponse(200, {
            questions: getNumberOfQuestion,
            roles: getRoles,
            experiences: getExperience

        }, "interview option feteched successfully")
    )

})

export {
    getInterviewOptions
}