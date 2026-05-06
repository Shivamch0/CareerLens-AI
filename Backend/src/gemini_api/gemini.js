import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/ApiError.js";

if(!process.env.GEMINI_API_KEY){
    throw new ApiError(400 , "Gemini API is not defined")
}

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAi.getGenerativeModel({
    model : "gemini-1.5-flash"
});

export const generateResponse = async (prompt) => {
   try {
     const result = await model.generateContent(prompt)
     const response = await result.response;
     const text = response.text();
     if(!text){
        throw new ApiError(400 , "Empty response from API...")
     }

     return text;
   } catch (error) {
    console.log("AI Error: " , error.message || error)
    throw error;
   }
}