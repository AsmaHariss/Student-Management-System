import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './db.js'
import { TeacherRouter } from './routes/auth.js'
import { StudentRouter } from './routes/studentRoute.js'
import { MarksRouter } from './routes/marksRoute.js'



const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))

app.use(cookieParser())
dotenv.config()
app.use('/auth', TeacherRouter)
app.use('/studentRoute', StudentRouter)
app.use('/marksRoute', MarksRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is running");
})