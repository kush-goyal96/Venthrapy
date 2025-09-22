import Therapist from "../models/Therapist.js";
import { streamUpload } from "./multipartHelpers.js";

export const listTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      therapists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch therapists",
    });
  }
};

export const getTherapistById = async (req, res) => {
  try {
    const { id } = req.params;
    const therapist = await Therapist.findById(id);
    if (!therapist)
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    res.json({
      success: true,
      therapist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch therapist",
    });
  }
};

export const createTherapist = async (req, res) => {
  try {
    const payload = { ...req.body };

    const normalizeArray = (value) => {
      if (Array.isArray(value)) return value;
      if (typeof value !== "string") return [];
      const trimmed = value.trim();
      if (!trimmed) return [];
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [];
        } catch (_) {
          return [];
        }
      }
      if (trimmed.includes(",")) {
        return trimmed
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      return [trimmed];
    };

    // Normalize known array fields from multipart form-data
    if (payload.languages !== undefined)
      payload.languages = normalizeArray(payload.languages);
    if (payload.specializations !== undefined)
      payload.specializations = normalizeArray(payload.specializations);
    if (payload.certifications !== undefined)
      payload.certifications = normalizeArray(payload.certifications);
    if (payload.areasOfExpertise !== undefined)
      payload.areasOfExpertise = normalizeArray(payload.areasOfExpertise);
    if (payload.ageGroups !== undefined)
      payload.ageGroups = normalizeArray(payload.ageGroups);
    if (payload.modalities !== undefined)
      payload.modalities = normalizeArray(payload.modalities);
    if (req.file) {
      const result = await streamUpload(req.file.buffer, {
        folder: `${
          process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads"
        }/therapists`,
        resource_type: "image",
      });
      payload.image = result.secure_url;
    }
    const therapist = await Therapist.create(payload);
    res.status(201).json({
      success: true,
      therapist,
    });
  } catch (error) {
    console.error("createTherapist error:", error?.message || error);
    res.status(400).json({
      success: false,
      message: "Failed to create therapist",
      error: error?.message || "",
    });
  }
};
