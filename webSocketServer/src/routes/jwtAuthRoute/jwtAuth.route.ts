import { Router } from "express";
import { generateNewAccessAndRefreshToken } from "../../controllers/auth-controllers/auth.controllers";



const jwtAuthRouter = Router()


jwtAuthRouter.post("/refresh",  generateNewAccessAndRefreshToken)

export default jwtAuthRouter