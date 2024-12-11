import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: "16kb"})) // limit to 16kb for json data receiving from client
app.use(express.urlencoded({extended: true, limit: "16kb"})) 
/*
->limit to 16kb for urlencoded data receiving from client
->urlencoded is used to encode data in a URL, 
->replacing special characters with a % followed by their ASCII code in hexadecimal.*/

app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)


export default app
