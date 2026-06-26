import { Router } from "express";
import { createSession } from "../../controllers/session-controller/create-interview";
import { verifyUserUsingAccessToken } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/zod-schema.middleware";
import { prepSchema } from "../../lib/zod/session-schema";
import { getAllInterview } from "../../controllers/session-controller/get-all-interviews";
import { getInterviewById } from "../../controllers/session-controller/get-interviewById";
import { getInterviewQuestionsById } from "../../controllers/session-controller/get-interviewQuestionById";

const interviewRouter = Router()

interviewRouter.post("/create-interview", verifyUserUsingAccessToken ,validateBody(prepSchema), createSession)
interviewRouter.get('/user-interviews',verifyUserUsingAccessToken, getAllInterview)
interviewRouter.get('/evaluation/:interviewId', getInterviewById)
interviewRouter.get('/questions/:interviewId', getInterviewQuestionsById)


export default interviewRouter  