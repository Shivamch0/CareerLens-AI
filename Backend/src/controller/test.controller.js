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

export { generateAptitudeQuestions, generateInterestQuestions };
