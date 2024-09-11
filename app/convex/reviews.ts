// convex/reviews.ts
import { action } from './_generated/server';
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeCode = action({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const { code } = args;
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Analyze the code
    const prompt = `Analyze the following code for potential bugs, code quality issues, and suggest improvements:

${code}

Provide your analysis in the following format:
1. Potential bugs:
2. Code quality issues:
3. Suggested improvements:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  },
});