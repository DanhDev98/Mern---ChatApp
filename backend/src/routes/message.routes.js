import express from "express"
import { getMessage, getUserForSideBar, sendMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()
router.get("/users",protectRoute,getUserForSideBar)
router.get("/:id", protectRoute, getMessage)
//gui tin nhan cho user
router.post("/send/:id", protectRoute, sendMessage)

export default router
