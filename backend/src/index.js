import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import { app, server, io } from "./lib/socket.io.js";
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
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('*', (req, res) => res.sendFile
    (path.resolve(__dirname, '../frontend', 'dist', 'index.html')))
}
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
server.listen(PORT, connectDB());
