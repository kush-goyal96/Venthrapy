import express from "express";
import cookieParser from "cookie-parser";
import { login, register, me, logout } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// cookie parser for this router
router.use(cookieParser());

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

export default router;
