import express, { json } from "express";
import http from "http";
import cors from "cors"
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import userrouter from "./src/routes/user-route/users.route";
import jwtAuthRouter from "./src/routes/jwtAuth-route/jwtAuth.route";
import { startSocket } from "./src/webSockets/socket";
import interviewRouter from "./src/routes/session-routes/interview.route";

dotenv.config();

const app = express();

 const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100,           // 100 requests per IP

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});
const port = 3001;

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(json());
app.use(globalLimiter)
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  console.log("server is running now");
  res.send("hello");
});

app.use("/api/v1/user", userrouter);
app.use("/api/v1/auth", jwtAuthRouter);
app.use("/api/v1/interview", interviewRouter);

// create http server
const server = http.createServer(app);
 
// attach socket.io
const io = startSocket(server);

// optional socket instance access
app.set("io", io);

// start server
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});