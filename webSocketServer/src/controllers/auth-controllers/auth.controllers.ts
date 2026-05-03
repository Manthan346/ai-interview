import { Request, Response } from "express";
import {  JwtPayload } from "jsonwebtoken";

import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import { NextFunction } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtAuth";
import { ApiResponse } from "../../helpers/ApiResponse";

import { prisma } from "../../lib/prisma";
import { authRequest } from "../../interfaces/auth.interface";





const generateNewAccessAndRefreshToken = asyncHandler(async (req: authRequest, res: Response, next: NextFunction) => {
    

    if (! req.user!.id || req.user?.email  ) {
        throw new ApiError(400, "details not found")
        
    }
    const newAccessToken = generateAccessToken({id: req.user!.id, email: req.user?.email, isVerified: req.user?.isVerified})
    const newRefreshToken = generateRefreshToken({id: req.user!.id})

   await prisma.user.update({
        where: {id: req.user?.id}, 
        data: {refreshToken: newRefreshToken,
            isVerified: req.user?.isVerified
        }
    })

    return res.status(200).json(
        new ApiResponse(200,{
      access_token:  newAccessToken,
      refresh_token: newRefreshToken
    }, "new access token and referesh token provided successfully")

    ) 
    

}
)

export {
    generateNewAccessAndRefreshToken
}