import OpenAI from "openai";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateResponse = async (prompt) => {
  try {
    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log("OpenRouter Error:", error);

    return "Failed to generate AI response";
  }
};
