import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groqApi = process.env.GROK_CLOUD_API;

if (!groqApi) {
  throw new Error("GROQ_API_KEY is missing in .env");
}

const groq = new Groq({
  apiKey: groqApi,
});

export const generateResponse = async (prompt) => {

  try {

    if (!prompt) {
      throw new Error("Prompt is required");
    }


    const completion = await groq.chat.completions.create({

      messages: [
        {
          role: "system",
          content:
            "You are a strict JSON API. Always return valid raw JSON only. Never use markdown or explanations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      model: "llama-3.3-70b-versatile",

      temperature: 0.4,

      max_tokens: 4096,

      top_p: 1,

      stream: false,
    });

    const text = completion?.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("Empty response received from Groq");
    }

    return {
      success: true,
      message: "AI response generated successfully",
      data: text,
    };

  } catch (error) {

    console.error("Groq Error:", error);

    // RATE LIMIT
    if (error.status === 429) {

      return {
        success: false,
        status: 429,
        message: "Groq rate limit exceeded. Please try again later.",
      };
    }

    // AUTH ERROR
    if (error.status === 401) {

      return {
        success: false,
        status: 401,
        message: "Invalid Groq API Key.",
      };
    }

    // NETWORK ERROR
    if (error.code === "ENOTFOUND") {

      return {
        success: false,
        status: 500,
        message: "Network error. Check your internet connection.",
      };
    }

    return {
      success: false,
      status: 500,
      message: error?.message || "Something went wrong with Groq API",
    };
  }
};