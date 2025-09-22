import express from "express";
import { createTherapist } from "../controllers/therapistController.js";
import { createBlog } from "../controllers/blogController.js";
import multer from "multer";
import { handleUpload } from "../controllers/uploadController.js";

const adminRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Future: add auth middleware to protect admin routes
adminRouter.post("/upload", upload.single("file"), handleUpload);
adminRouter.post("/add-therapist", upload.single("image"), createTherapist);
adminRouter.post("/add-blog", upload.single("coverImage"), createBlog);
// audio file under 'audio' field or send URL in audioUrl
import { createMeditation } from "../controllers/meditationController.js";
adminRouter.post("/add-meditation", upload.single("audio"), createMeditation);

export default adminRouter;
