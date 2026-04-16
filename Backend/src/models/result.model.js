import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    aptitudeScore: {
      type: Number,
    },
    interviewScore: {
      type: Number,
    },
    skillMatchPercentage: {
      type: Number,
    },
    recommendedCareer: {
      type: [
        {
          careerTitle: String,
          score: Number,
        },
      ],
    },
  },
  { timestamps: true },
);

export const Result = mongoose.model("Result", resultSchema);
