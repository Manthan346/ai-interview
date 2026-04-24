import express, { json } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userrouter from "./src/routes/userRoutes/users.route";
import jwtAuthRouter from "./src/routes/jwtAuthRoute/jwtAuth.route";
import { startSocket } from "./src/webSockets/socket";

dotenv.config();

const app = express();
const port = 3001;

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(json());
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  console.log("server is running now");
  res.send("hello");
});

app.use("/api/v1/user", userrouter);
app.use("/api/v1/auth", jwtAuthRouter);

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