import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAi.getGenerativeModel({
    model : "gemini-1.5-flash"
});

export const generateResponse = async (prompt) => {
   try {
     const result = await model.generateContent(prompt)
     const response = await result.response;
     return response.text();
   } catch (error) {
    console.log(`AI Error ${error}`)
    throw error;
   }
}