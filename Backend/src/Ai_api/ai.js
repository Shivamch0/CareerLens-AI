import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateResponse = async (prompt) => {
  try {

    const completion = await client.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.5,
      max_tokens: 800,
    });

    return completion?.choices?.[0]?.message?.content || null;

  } catch (error) {

    console.error("OpenRouter Error:", error);

    return null;
  }
};