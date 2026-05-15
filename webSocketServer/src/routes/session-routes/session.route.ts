import { Router } from "express";
import { createSession } from "../../controllers/session-controller/create-session";
import { verifyUserUsingAccessToken } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/zod-schema.middleware";
import { prepSchema } from "../../lib/zod/session-schema";

const sessionRouter = Router()

sessionRouter.post("/create-session", verifyUserUsingAccessToken ,validateBody(prepSchema), createSession)

export default sessionRouter