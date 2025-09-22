import mongoose from "mongoose";

const MeditationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    duration: { type: String, default: "" },
    description: { type: String, default: "" },
    audioUrl: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Meditation", MeditationSchema);
