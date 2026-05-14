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

  const aiResponse = await generateResponse(prompt);

  if (!aiResponse.success) {
    throw new ApiError(
      aiResponse.status || 500,
      aiResponse.message || "AI generation failed...",
    );
  }

  let questions;
  try {
    questions = parseAIResponse(aiResponse.data);
    questions = questions.map((q, index) => ({
      id: index + 1,
      ...q,
    }));
  } catch (err) {
    console.error(err);

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
      ...q,
    }));
  } catch (err) {
    throw new ApiError(500, "Failed to parse AI response");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Aptitude questions generated..."));
});

const evaluateAnswers = (answers, questions) => {
  let score = 0;

  let categoryScores = {};

  const evaluatedAnswers = [];

  answers.forEach((ans) => {
    const originalQuestion = questions.find((q) => q.id === ans.questionId);

    if (!originalQuestion) return;

    const isCorrect =
      ans.selectedOptionIndex === originalQuestion.correctAnswerIndex;

    const category = originalQuestion.category;

    // Initialize category
    if (!categoryScores[category]) {
      categoryScores[category] = 0;
    }

    // Increase score
    if (isCorrect) {
      score++;

      categoryScores[category] += 1;
    }

    evaluatedAnswers.push({
      questionId: ans.questionId,

      selectedOptionIndex: ans.selectedOptionIndex,

      correctAnswerIndex: originalQuestion.correctAnswerIndex,

      category,

      isCorrect,
    });
  });

  return {
    score,

    totalQuestions: questions.length,

    percentage: Math.round((score / questions.length) * 100),

    categoryScores,

    evaluatedAnswers,
  };
};

const submitAptitudeTest = asyncHandler(async (req, res) => {
  const { answers, questions: storedQuestions } = req.body;

  if (!answers || !Array.isArray(answers)) {
    throw new ApiError(400, "Answers are required...");
  }

  if (!storedQuestions || !Array.isArray(storedQuestions)) {
    throw new ApiError(400, "Questions are required...");
  }

  // Evaluate Answers
  const result = evaluateAnswers(answers, storedQuestions);

  // Save Result
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        aptitudeTest: {
          score: result.score,

          totalQuestions: result.totalQuestions,

          percentage: result.percentage,

          categoryScores: result.categoryScores,

          answers: result.evaluatedAnswers,
        },

        "onboarding.aptitudeTestCompleted": true,
      },
    },
    { new: true },
  ).select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        score: result.score,

        totalQuestions: result.totalQuestions,

        percentage: result.percentage,

        categoryScores: result.categoryScores,

        answers: result.evaluatedAnswers,
      },

      "Aptitude test submitted successfully",
    ),
  );
});

const submitInterestTest = asyncHandler(async (req, res) => {
  const { answers, questions: storedQuestions } = req.body;

  if (!answers || !Array.isArray(answers)) {
    throw new ApiError(400, "Answers are required...");
  }

  if (!storedQuestions || !Array.isArray(storedQuestions)) {
    throw new ApiError(400, "Questions are required...");
  }

  // Evaluate Answers
  const result = evaluateAnswers(answers, storedQuestions);

  // Find Dominant Interest
  const dominantInterest = Object.keys(result.categoryScores).reduce((a, b) =>
    result.categoryScores[a] > result.categoryScores[b] ? a : b,
  );

  // Save Result
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        interestTest: {
          scores: result.categoryScores,

          dominantInterest,

          score: result.score,

          totalQuestions: result.totalQuestions,

          percentage: result.percentage,

          answers: result.evaluatedAnswers,
        },

        "onboarding.interestTestCompleted": true,
      },
    },
    { new: true },
  ).select("-password");

  return res.status(201).json(
    new ApiResponse(
      200,
      {
        dominantInterest,

        score: result.score,

        totalQuestions: result.totalQuestions,

        percentage: result.percentage,

        categoryScores: result.categoryScores,

        answers: result.evaluatedAnswers,
      },

      "Interest test submitted successfully",
    ),
  );
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
