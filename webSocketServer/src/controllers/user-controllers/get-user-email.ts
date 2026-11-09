import { Response } from "express"
import { ApiResponse } from "../../helpers/ApiResponse"
import { asyncHandler } from "../../helpers/asyncHandler"
import { authRequest } from "../../interfaces/auth.interface"

export const getUserEmail = asyncHandler(async (req: authRequest, res: Response) => {
    return res.status(200).json(
        new ApiResponse(200, { email: req.user?.email }, "User email retrieved successfully")
    )
})
