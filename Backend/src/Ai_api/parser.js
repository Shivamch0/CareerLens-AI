import { ApiError } from "../utils/ApiError.js";

export const parseAIResponse = (text) => {
  try {

    // 1. Check empty response
    if (!text || typeof text !== "string") {
      throw new ApiError(400, "Empty AI response");
    }

    // 2. Remove markdown formatting
    let cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 3. Extract JSON array safely
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      throw new ApiError(400, "No valid JSON array found");
    }

    cleaned = jsonMatch[0];

    // 4. Parse JSON
    const parsedData = JSON.parse(cleaned);

    // 5. Validate array
    if (!Array.isArray(parsedData)) {
      throw new ApiError(400, "AI response is not an array");
    }

    return parsedData;

  } catch (error) {

    console.error("========== AI PARSE ERROR ==========");
    console.error("RAW RESPONSE:\n", text);
    console.error("ERROR:\n", error);
    console.error("====================================");

    throw new ApiError(
      500,
      error?.message || "Failed to parse AI response"
    );
  }
};