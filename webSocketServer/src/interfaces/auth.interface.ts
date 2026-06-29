import { Request } from "express";

// extending interface types for verifying user data for new access,refresh token generation
export interface authRequest extends Request {
    user?: {
        id: string,
        email?: string,
        isVerified?: boolean
    }
}