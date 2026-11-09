import { Response } from "express"
import { ApiError } from "../../helpers/ApiError"
import { ApiResponse } from "../../helpers/ApiResponse"
import { asyncHandler } from "../../helpers/asyncHandler"
import { authRequest } from "../../interfaces/auth.interface"
import { prisma } from "../../lib/prisma"

export const signOut = asyncHandler(async (req: authRequest, res: Response) => {
    if (!req.user?.id) {
        throw new ApiError(401, "unauthorized")
    }

    await prisma.user.update({
        where: { id: req.user.id },
        data: {
            isVerified: false,
            refreshToken: null
        }
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        path: "/"
    }
    res.clearCookie("accessToken", cookieOptions)
    res.clearCookie("refreshToken", cookieOptions)

    return res.status(200).json(
        new ApiResponse(200, [], "Signed out successfully")
    )
})
