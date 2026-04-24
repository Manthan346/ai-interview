import { Router } from "express";
import { createUser } from "../../controllers/userControllers/users.create";
import { sendOtpToEmail, verifyEmail } from "../../controllers/userControllers/users.verify";


const userRouter = Router()

userRouter.post("/register", createUser)
userRouter.post("/send-email", sendOtpToEmail)
userRouter.post("/verify-email", verifyEmail)

export default userRouter 