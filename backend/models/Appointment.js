import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
      index: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked",
      index: true,
    },
    notes: { type: String },
  },
  { timestamps: true }
);

appointmentSchema.index({ therapistId: 1, startTime: 1 }, { unique: false });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
