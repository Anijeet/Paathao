import dotenv from "dotenv"
dotenv.config()
import express, { response } from "express";
import cors from "cors"
import connectToDb from "./db";
import userRoutes from "./routes/userRoutes";
import captainRoutes from"./routes/captainRoutes"
import cookieParser from "cookie-parser"

connectToDb()

const app =express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)

export default app