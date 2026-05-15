import { Router } from "express";
import { createUser } from "../../controllers/user-controllers/users-create";
import { sendOtpToEmail, verifyEmail } from "../../controllers/user-controllers/users-verify";


const userRouter = Router()

userRouter.post("/register", createUser)
userRouter.get("/send-email", sendOtpToEmail)
userRouter.post("/verify-email", verifyEmail)

export default userRouter 