import Blog from "../models/Blog.js";
import { streamUpload } from "./multipartHelpers.js";

export const listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      const result = await streamUpload(req.file.buffer, {
        folder: `${process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads"}/blogs`,
        resource_type: "image",
      });
      payload.coverImage = result.secure_url;
    }
    const blog = await Blog.create(payload);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to create blog" });
  }
};
