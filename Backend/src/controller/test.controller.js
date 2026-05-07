import { generateResponse } from "../Ai_api/ai.js";
import { parseAIResponse } from "../Ai_api/parser.js";
import {
  interestPrompt,
  aptitudePrompt,
  careerRecommendationPrompt,
} from "../Ai_api/prompt.js";
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

  if (!aiText || aiText.startsWith("Failed")) {
    throw new ApiError(500, "AI generation failed...");
  }

  let questions;
  try {
    questions = parseAIResponse(aiText);
    questions = questions.map((q, index) => ({
      id: index + 1,
      ...q
    }));
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

  if (!aiText || aiText.startsWith("Failed")) {
    throw new ApiError(500, "AI generation failed...");
  }

  let questions;
  try {
    questions = parseAIResponse(aiText);
    questions = questions.map((q, index) => ({
      id: index + 1,
      ...q
    }));
  } catch (err) {
    throw new ApiError(500, "Failed to parse AI response");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Aptitude questions generated..."));
});

const submitAptitudeTest = asyncHandler(async (req, res) => {

  const { answers, questions: storedQuestions } = req.body;

  if (!answers || !Array.isArray(answers)) {
    throw new ApiError(400, "Answers are required...");
  }

  if (
    !storedQuestions ||
    !Array.isArray(storedQuestions)
  ) {
    throw new ApiError(
      400,
      "Stored questions are required..."
    );
  }

  let score = 0;

  const evaluatedAnswers = answers.map((ans) => {

    const originalQuestion = storedQuestions.find(
      (q) => q.id === ans.questionId
    );

    if (!originalQuestion) {
      throw new ApiError(400, "Question not found");
    }

    const isCorrect =
      ans.selectedOptionIndex ===
      originalQuestion.correctAnswerIndex;

    if (isCorrect) {
      score++;
    }

    return {
      questionId: ans.questionId,

      selectedOptionIndex:
        ans.selectedOptionIndex,

      correctAnswerIndex:
        originalQuestion.correctAnswerIndex,

      isCorrect,
    };
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        aptitudeTest: {
          score,
          totalQuestions: storedQuestions.length,
          answers: evaluatedAnswers,
        },
      },
    },
    { new: true }
  ).select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        score,
        totalQuestions: storedQuestions.length,
        percentage: Math.round(
          (score / storedQuestions.length) * 100
        ),
      },
      "Aptitude test submitted successfully"
    )
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

    scores[category] += ans.weight || 1;
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

const getCareerRecommendations = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(400, "User not found...");
  }

  if (!user.interestTest) {
    throw new ApiError(400, "Interest test not completed...");
  }

  if (!user.aptitudeTest) {
    throw new ApiError(400, "Aptitude test not completed...");
  }

  const { interests, careerStage, education, interestTest, aptitudeTest } =
    user;

  const prompt = careerRecommendationPrompt(
    careerStage,
    education,
    interests,
    interestTest,
    aptitudeTest,
  );

  const aiText = await generateResponse(prompt);

  if (!aiText || aiText.startsWith("Failed")) {
    throw new ApiError(500, "AI generation failed...");
  }

  let recommendations;
  try {
    recommendations = parseAIResponse(aiText);
  } catch (error) {
    throw new ApiError(500, "Failed to parse AI recommendations...");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        recommendations,
        "Career Recommendations generate successfully...",
      ),
    );
});

export {
  generateAptitudeQuestions,
  generateInterestQuestions,
  submitAptitudeTest,
  submitInterestTest,
  getCareerRecommendations,
};
