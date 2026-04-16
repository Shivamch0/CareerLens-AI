import mongoose from "mongoose";

const skillGapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetCareer: {
      type: String,
    },
    matchedSkills: {
      type: [String],
    },
    missingSkills: {
      type: [String],
    },
    matchPercentage: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const SkillGap = mongoose.model("SkillGap", skillGapSchema);
