import { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import { ApiError } from "../../helpers/ApiError";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { ResendEmail } from "../../lib/resend";
import { ApiResponse } from "../../helpers/ApiResponse";
import { prisma } from "../../lib/prisma";



interface TokenPayload {
    id: string,
    email: string
}

const sendOtpToEmail = asyncHandler(async (req: Request, res: Response) => {
    //get token from cookies
    const token = req.cookies.accessToken

    if (!token) {
        throw new ApiError(404, "access token not found please login again")

    }
    //decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
    //get the email from cookie
    const email = decoded.email

    console.log(email)
    console.log(decoded.id)

    //generate otp
    const otp = String(crypto.randomInt(10000, 100000))
    console.log(otp)


    //send otp thorugh resend lib/resend
    const otpToEmail = await ResendEmail(email, otp)
    const saveOtp = await prisma.user.update({
        where: { id: decoded.id },
        data: {
            userOtp: otp,
            otpExpires: new Date(Date.now() + 5 * 60 * 1000)

        }
    })


    return res.status(200).json(
        new ApiResponse(200, {
            email,

        }, "otp send successfully")
    )


})

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { otp } = req.body
    const token = req.cookies.accessToken

    if (!otp) {
        throw new ApiError(400, "please enter your otp")
        
    }

    if (!token) {
        throw new ApiError(404, "access token not found please login again")

    }
    //decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
    //get the email from cookie
    const email = decoded.email

    const user = await prisma.user.findUnique({
        where: { email: email }
    })

    if (!user) {
        throw new ApiError(400, "user not found")

    }
    if (user.isVerified) {
        throw new ApiError(400, "user already verified")        
    }

    const checkUserOtpExpirey = user.otpExpires
    if (new Date(Date.now()) > checkUserOtpExpirey!) throw new ApiError(400, "otp expires please generate new")

    if (user.userOtp !== otp) throw new ApiError(400, "invalid otp")

    
    //check if user already verified 

    
   const verifiedEmail = await prisma.user.update({
        where: {email: email},
        data: {
            isVerified: true,
            userOtp: "",
            otpExpires: null
        }
    })
    

    return res.status(200).json(
        new ApiResponse(200, {
            isVerified: verifiedEmail.isVerified
            
        }, "user email verified successfully")
    )






})

export {
    sendOtpToEmail,
    verifyEmail
}

