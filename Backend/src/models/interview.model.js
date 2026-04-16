import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionAnswer: {
      type: [
        {
          question: String,
          answer: String,
          score: Number,
        },
      ],
    },
    individualQuestionScore: {
      type: [],
    },
    feedback: {
      type: String,
    },
    OverallScore: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Interview = mongoose.model("Interview", interviewSchema);
