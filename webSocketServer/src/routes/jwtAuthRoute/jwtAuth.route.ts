import { Router } from "express";
import { generateNewAccessAndRefreshToken } from "../../controllers/authControllers/auth.controllers";


const jwtAuthRouter = Router()


jwtAuthRouter.post("/refresh", generateNewAccessAndRefreshToken)

export default jwtAuthRouter