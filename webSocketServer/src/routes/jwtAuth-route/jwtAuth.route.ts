import { Router } from "express";
import { generateNewAccessAndRefreshToken } from "../../controllers/auth-controllers/new-accessToken";



const jwtAuthRouter = Router()


jwtAuthRouter.post("/refresh",  generateNewAccessAndRefreshToken)

export default jwtAuthRouter 