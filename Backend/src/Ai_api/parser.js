export const parseAIResponse = (text) => {
  try {

    let cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");

    if (start !== -1 && end !== -1) {
      cleaned = cleaned.substring(start, end + 1);
    }

    // Validate closing brackets
    if (!cleaned.endsWith("]")) {
      throw new Error("Incomplete JSON response");
    }

    return JSON.parse(cleaned);

  } catch (error) {

    console.error("RAW AI RESPONSE:", text);
    console.error("PARSE ERROR:", error);

    throw new Error("Failed to parse AI response");
  }
};