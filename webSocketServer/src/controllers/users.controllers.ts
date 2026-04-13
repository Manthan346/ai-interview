import { Request, Response } from "express"
import { verifyGoogleAuth } from "../utils/googleAuth.js"
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { ApiError } from "../helpers/ApiError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtAuth.js";

//using asyncHadler to avoid try catch mess 


const SignUpUser = asyncHandler(async (req: Request, res: Response) => {
     


    const id_token = req.headers.authorization?.split(" ")[1]

    if (!id_token) {
        throw new ApiError(404, "token not found or invalid token")

    }
    const verify = await verifyGoogleAuth(id_token)
    if (!verify) {
        throw new ApiError(404, "google verification failed please login again")

    }

    //genrating refresh token
    const refreshToken = generateRefreshToken({ id: verify!.sub! })

    //generating access token
    const accessToken = generateAccessToken({
        id: verify?.sub!,
        name: verify?.name,
        email: verify?.email
    })


   

    const user = await prisma.$transaction(async (tx) => {


        const updatedUser = await tx.user.upsert({
            where: { id: verify?.sub },

            create: {
                id: verify?.sub,
                email: verify?.email!,
                name: verify?.name!,
                refreshToken: refreshToken


            },
            update: {
                name: verify?.name,
                email: verify?.email!,
                
                refreshToken: refreshToken



            },
        })
        return updatedUser
    })
    console.log(user)
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
        secure: false,
        sameSite: "lax"
   
      
        
    })


    return res.status(200).json(
        new ApiResponse(200, {
            id: user.id,
            userName: user.name,
            email: user.email
       
        }, "user created successfully")
    )

}

)


const username = asyncHandler((req: Request, res: Response)=> {
    res.send("response is working")


}) 




export {
    SignUpUser,
    username
}



