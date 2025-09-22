import express from "express";
import { listBlogs, getBlogById } from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/", listBlogs);
blogRouter.get("/:id", getBlogById);

export default blogRouter;
