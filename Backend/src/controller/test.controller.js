import { generateResponse } from "../gemini_api/gemini.js";
import { parseAIResponse } from "../gemini_api/parser.js";
import { interestPrompt, aptitudePrompt } from "../gemini_api/prompt.js";
import { User } from "../models/user.model.js";

// Utils Imports
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateInterestQuestions = asyncHandler(async (req, res) => {
  const interests = req.user.interests;

  if (!interests || interests.length === 0) {
    throw new ApiError(400, "User interests not found...");
  }

  const prompt = interestPrompt(interests);

  const aiText = await generateResponse(prompt);
  let questions;
  try {
    questions = parseAIResponse(aiText);
  } catch (err) {
    throw new ApiError(500, "Failed to parse AI response");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Interests Questions generated..."));
});

const generateAptitudeQuestions = asyncHandler(async (req, res) => {
  const careerStage = req.user.careerStage;

  if (!careerStage) {
    throw new ApiError(400, "User career Stage not found...");
  }

  const prompt = aptitudePrompt(careerStage);

  const aiText = await generateResponse(prompt);
  let questions;
  try {
    questions = parseAIResponse(aiText);
  } catch (err) {
    throw new ApiError(500, "Failed to parse AI response");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Aptitude questions generated..."));
});

const submitAptitudeTest = asyncHandler(async (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    throw new ApiError(400, "Answers are required...");
  }

  let score = 0;

  const evaluatedAnswers = answers.map((ans) => {
    const isCorrect = ans.selectedOption === ans.correctAnswer;

    if (isCorrect) score++;

    return {
      questionId: ans.questionId,
      selectedOptions: ans.selectedOption,
      isCorrect,
    };
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        aptitudeTest: {
          score,
          totalQuestions: answers.length,
          answers: evaluatedAnswers,
        },
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Aptitude test submitted successfully..."),
    );
});

const submitInterestTest = asyncHandler(async (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    throw new ApiError(400, "Answers are required...");
  }

  let scores = {};

  answers.forEach((ans) => {
    const category = ans.category;

    if (!scores[category]) {
      scores[category] = 0;
    }

    scores[category] += 1;
  });

  const keys = Object.keys(scores);

  if (keys.length === 0) {
    throw new ApiError(400, "No valid answers provided");
  }

  const dominantInterest = keys.reduce((a, b) =>
    scores[a] > scores[b] ? a : b,
  );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        interestTest: {
          scores,
          dominantInterest,
        },
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Interest test submitted successfully"));
});

export { generateAptitudeQuestions, generateInterestQuestions };
