import { Request, Response } from "express"
import { verifyGoogleAuth } from "../../utils/googleAuth.js"
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { ApiError } from "../../helpers/ApiError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtAuth.js";
import { messages } from "@elevenlabs/elevenlabs-js/api/resources/conversationalAi/resources/conversations/index.js";
import crypto from "crypto"
import strict from "assert/strict";

const createUser = asyncHandler(async (req: Request, res: Response) => {
    const {email} = req.body

    if (!email) {
        throw new ApiError(400, "please provide an email")

        
    }
    //create if user not exists update if user exists (login and signup using single endpoint)
   
    const user = await prisma.user.upsert({
        where: {email: email},
        update: {
            
            email: email,
            refreshToken: ""
        },
        create: {
           
            userOtp: "",
            email: email,
            refreshToken: ""
        }
    })

  const accessToken=  generateAccessToken({
        id: user.id,
        email: user.email,
        isVerified: user.isVerified
    })

  const refreshToken =  generateRefreshToken({
        id: user.id,
        
    })


 const addRefreshToken =    await prisma.user.update({
      where: {id: user.id},
      data: {refreshToken: refreshToken}
    })

    if (!addRefreshToken) {
        throw new ApiError(400, "cannot add refresh token to database please login again")
        
    }

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 30 * 60 * 1000
    })
       res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json(
        new ApiResponse(200,{
            addRefreshToken
        }, "user created successfully")
    )


}
)



export {
    createUser
    
}



