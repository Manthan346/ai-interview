import { Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import { NextFunction } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtAuth";
import { ApiResponse } from "../../helpers/ApiResponse";

import { prisma } from "../../lib/prisma";
import { authRequest } from "../../interfaces/auth.interface";
import jwt from "jsonwebtoken"
import { TokenPayload } from "../../interfaces/jwt.interface";





const generateNewAccessAndRefreshToken = asyncHandler(async (req: authRequest, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        throw new ApiError(401, "unauthorized")
    }

    let decoded: TokenPayload
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as TokenPayload
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, "unauthorized")
        }
        throw error
    }

    const user = await prisma.user.findFirst({
        where: {
            id: decoded.id
        }
    })
    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
        throw new ApiError(401, "unauthorized")
    }

    const newAccessToken = generateAccessToken({id:user.id, email: user.email, isVerified: user.isVerified})
    const newRefreshToken = generateRefreshToken({id: user.id})

    const tokenRotation = await prisma.user.updateMany({
        where: {
            id: user.id,
            refreshToken
        },
        data: {
            refreshToken: newRefreshToken
        }
    })
    if (tokenRotation.count !== 1) {
        throw new ApiError(401, "unauthorized")
    }

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge:  15 * 60 * 1000, // 15 minutes
    })

    return res.status(200).json(
        new ApiResponse(200, "new access token and refresh token provided successfully")
    )
}
)

export {
    generateNewAccessAndRefreshToken
} 