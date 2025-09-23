import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    score: { type: Number, enum: [-2, -1, 0, 1, 2], required: true },
    tags: { type: [String], default: [] },
    note: { type: String },
    entryDate: { type: String, required: true, index: true }, // YYYY-MM-DD for one-per-day
  },
  { timestamps: true }
);

moodEntrySchema.index({ userId: 1, entryDate: 1 }, { unique: true });

const MoodEntry = mongoose.model("MoodEntry", moodEntrySchema);
export default MoodEntry;
