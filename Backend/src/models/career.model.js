import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    careerTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    requiredSkills: {
      type: [String],
    },
    roadmap: {
      type: [
        {
          step: String,
          duration: String,
        },
      ],
    },
  },
  { timestamps: true },
);

export const Career = mongoose.model("Career", careerSchema);
