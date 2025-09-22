import mongoose from "mongoose";

const TherapistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: "" },
    specializations: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    sessionCost: { type: String, default: "" },
    title: { type: String, default: "" },
    experience: { type: String, default: "" },
    bio: { type: String, default: "" },
    approach: { type: String, default: "" },
    education: { type: String, default: "" },
    availability: { type: String, default: "" },
    sessionDuration: { type: String, default: "" },
    therapyType: { type: String, default: "" },
    ageGroups: { type: [String], default: [] },
    modalities: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    areasOfExpertise: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Therapist", TherapistSchema);
