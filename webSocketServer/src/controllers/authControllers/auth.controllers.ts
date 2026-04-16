import { Request, Response } from "express";
import {  JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import { NextFunction } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtAuth";
import { ApiResponse } from "../../helpers/ApiResponse";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";





const generateNewAccessAndRefreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.headers.authorization?.split(" ")[1]

    if (!refreshToken) {
        throw new ApiError(401, "token is not present please login again")
        
    }


    const decoded =  jwt.verify(refreshToken,process.env.JWT_SECRET!) as JwtPayload

    
    console.log(`decoded value: ${decoded}`)
    const user = decoded.id
      console.log(`user: ${user}`)


    const newAccessToken = generateAccessToken({id: user})
    const newRefreshToken = generateRefreshToken({id: user})

    prisma.user.update({
        where: {id: user},
        data: {refreshToken: newRefreshToken}
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