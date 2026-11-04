import { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import { prisma } from "../../lib/prisma";
import { authRequest } from "../../interfaces/auth.interface";
import { ApiResponse } from "../../helpers/ApiResponse";

const createSession = asyncHandler(async(req: authRequest, res: Response) => {
    const { candidateName, experienceId, roleId, numberOfQuestionId } = req.body
    const userId = req.user?.id

    const [experienceRecord, roleRecord, numberOfQuestionRecord] = await Promise.all([
        prisma.yearOfExperience.findUnique({
            where: {id: experienceId}
        }),

        prisma.roles.findUnique({
            where: {id: roleId}
        }),

        prisma.numberOfQuestion.findUnique({
            where: {id: numberOfQuestionId}
        })
    ])

    // Validate that all related records exist
    if (!experienceRecord) {
        throw new ApiError(400, "Invalid experienceId provided")
    }

    if (!roleRecord) {
        throw new ApiError(400, "Invalid roleId provided")
    }

    if (!numberOfQuestionRecord) {
        throw new ApiError(400, "Invalid numberOfQuestionId provided")
    }

    if (!userId) {
        throw new ApiError(401, "unauthorized")
    }

    const sessionDetail = await prisma.interview.create({
        data: {
            candidateName: candidateName,
            experienceValue: experienceRecord.experience,
            roleValue: roleRecord.role,
            numberOfQuestionValue: numberOfQuestionRecord.NumberOfQuestion,
            userId: userId,
            roleId: roleId,
            experienceId,
            numberOfQuestionId,


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