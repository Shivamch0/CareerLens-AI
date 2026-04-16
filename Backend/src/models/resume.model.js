import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeFile: {
      type: String,
    },
    extractedSkills: {
      type: [String],
    },
    educationDetails: {
      type: [String],
    },
    experience: {
      type: [String],
    },
  },
  { timestamps: true },
);

export const Resume = mongoose.model("Resume", resumeSchema);
