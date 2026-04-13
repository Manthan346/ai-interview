import { Router } from "express";
import { SignUpUser, username } from "../controllers/users.controllers";

const userrouter = Router()

userrouter.post("/register", SignUpUser)
userrouter.post("/username", username)

export default userrouter