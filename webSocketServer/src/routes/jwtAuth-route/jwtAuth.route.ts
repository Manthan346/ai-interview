import { Router } from "express";
import { generateNewAccessAndRefreshToken } from "../../controllers/auth-controllers/new-accessToken";
import { verifyUserUsingAccessToken } from "../../middlewares/auth.middleware";



const jwtAuthRouter = Router()


jwtAuthRouter.post("/refresh",  generateNewAccessAndRefreshToken)
jwtAuthRouter.get("/validate", verifyUserUsingAccessToken, (_req, res) => {
    res.status(204).end()
})

export default jwtAuthRouter