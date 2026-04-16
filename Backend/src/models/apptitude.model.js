import mongoose from "mongoose";

const aptitudeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
    },
    totalQuestions: {
      type: Number,
    },
    answer: {
      type: [
        {
          questuionId: String,
          selectedOptions: String,
          isCorrect: Boolean,
        },
      ],
    },
  },
  { timeStamps: true },
);

export const Aptitude = mongoose.model("Aptitude", aptitudeSchema);
