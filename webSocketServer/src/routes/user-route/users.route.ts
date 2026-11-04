import { Router } from "express";
import { createUser } from "../../controllers/user-controllers/users-create";
import { verifyUserUsingAccessToken } from "../../middlewares/auth.middleware";
import { sendOtpToEmail, verifyEmail } from "../../controllers/user-controllers/users-verify";
import { getAllInterview } from "../../controllers/session-controller/get-all-interviews";


const userRouter = Router()

userRouter.post("/register", createUser)
userRouter.get("/send-email", sendOtpToEmail)
userRouter.post("/verify-email", verifyEmail)
userRouter.get('/user-interviews',verifyUserUsingAccessToken, getAllInterview)

export default userRouter   