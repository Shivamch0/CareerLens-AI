import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/ApiError.js"

const geminiApi = process.env.GEMINI_API_KEY;
if(!geminiApi){
  throw new ApiError(400 , "Api key is not provided...")
}

const genAI = new GoogleGenerativeAI(geminiApi);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
});

export const generateResponse = async (prompt) => {
  try {

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    return text;

  } catch (error) {

    console.error("Gemini Error:", error);

    return null;
  }
};