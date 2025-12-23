import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import authRoute from './routes/auth.route.js'
import connectDB from "./db/connectDB.js"
import questionRoutes from "./routes/question.route.js" 
import cors from 'cors'

const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://interview-prep-app-alpha.vercel.app"
    ],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type","Authorization"]
}));


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/auth",authRoute);
app.use("/api/questions",questionRoutes)
connectDB()
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} port`)
    
})