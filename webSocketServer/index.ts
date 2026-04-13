import express, { json } from 'express'
import { Request, Response } from 'express'
import http from 'http'

import userrouter from './src/routes/users.route';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { startSocket } from './src/webSockets/socket';

const app = express()
app.use(cors({
   origin: "http://localhost:3000",
   credentials: true
    
}))


const port = 3001
const server = http.createServer(app)
startSocket(server)
app.use(json())
app.use(cookieParser())










app.get("/", (req, res)=> {
    console.log("server is running now")
    res.send("hello")

})

app.use("/v1/api/users", userrouter)
app.use("v1/user", userrouter)


server.listen(port, () => console.log("port running on 3001"))
