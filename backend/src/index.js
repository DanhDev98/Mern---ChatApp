import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
const app = express();
dotenv.config();
app.use(express.json({ limit: "50mb" })); // Giới hạn 50MB
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.listen(PORT, connectDB());
