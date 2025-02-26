import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
const app = express()
dotenv.config()
app.use(express.json())
const PORT = process.env.PORT
app.use("/api/auth" , authRoutes)
app.listen(PORT, connectDB())