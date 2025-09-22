import Meditation from "../models/Meditation.js";
import { streamUpload } from "./multipartHelpers.js";

export const listMeditations = async (req, res) => {
  try {
    const meditations = await Meditation.find().sort({ createdAt: -1 });
    res.json({ success: true, meditations });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch meditations" });
  }
};

export const getMeditationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const meditation = await Meditation.findOne({ slug });
    if (!meditation)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, meditation });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch meditation" });
  }
};

export const createMeditation = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      const result = await streamUpload(req.file.buffer, {
        folder: `${
          process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads"
        }/meditations`,
        resource_type: "video", // audio treated as video in Cloudinary
      });
      payload.audioUrl = result.secure_url;
    }
    const meditation = await Meditation.create(payload);
    res.status(201).json({ success: true, meditation });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to create meditation" });
  }
};
