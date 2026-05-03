import { TokenPayload } from "../interfaces/jwt.interface"
import { ApiError } from "../helpers/ApiError";
import { asyncHandler } from "../helpers/asyncHandler";
import { authRequest } from "../interfaces/auth.interface";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"


export const verifyUserUsingAccessToken = asyncHandler(async(req: authRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        throw new ApiError(401, "unauthorized")
        
    }
    //verify user 
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as TokenPayload
     req.user = {
        id: decoded.id,
        email: decoded.email,
        isVerified: decoded.isVerified
     }

     next()

})