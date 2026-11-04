import { TokenPayload } from "../interfaces/jwt.interface"
import { ApiError } from "../helpers/ApiError";
import { asyncHandler } from "../helpers/asyncHandler";
import { authRequest } from "../interfaces/auth.interface";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { prisma } from "../lib/prisma";


export const verifyUserUsingAccessToken = asyncHandler(async(req: authRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        throw new ApiError(401, "unauthorized")
    }

    let decoded: TokenPayload
    try {
        decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as TokenPayload
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, "unauthorized")
        }
        throw error
    }

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        throw new ApiError(401, "unauthorized")
    }

    const user = await prisma.user.findUnique({
        where: { id: decoded.id }
    })
    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
        throw new ApiError(401, "unauthorized")
    }
    if (!user.isVerified) {
        throw new ApiError(401, "please verify your email")
    }

    req.user = {
        id: decoded.id,
        email: user.email,
        isVerified: user.isVerified
    }

    next()
})