export const parseAIResponse = (text) => {
  try {
     const cleaned = text.replace(/```json|```/g, "").trim();
     return JSON.parse(cleaned);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error("Invalid AI response format");
  }
};
