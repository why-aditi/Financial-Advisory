const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.6,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      "Short term": {
        type: "string",
      },
      "Long Term": {
        type: "string",
      },
    },
    required: ["Short term", "Long Term"],
  },
};

async function getNumericalGoal(userData) {
  try {
    const prompt = `
      You are a financial advisor AI specializing in personalized investment guidance.
      
      IMPORTANT: Carefully analyze the provided user data including their financial background, 
      current savings, investments, income, expenses, and stated goals.
      
      Based on this analysis, calculate meaningful percentage estimates of:
      1. Short-term goal completion (1-3 year goals) - Compare current savings/investments against 
         short-term targets mentioned in the data
      2. Long-term goal completion - Evaluate progress toward retirement 
         or other long-term financial goals
         
      Consider factors like:
      - Current savings relative to stated goals
      - Investment portfolio alignment with goals
      - Income vs. expenses and saving rate
      - Debt levels and repayment progress
      - Age and time horizon
      
      Even if some data is missing, provide your best reasonable estimate based on available information.
      DO NOT return 0% unless the user truly has made no progress. Provide realistic percentages.
      
      User Data: ${JSON.stringify(userData)}
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;

    if (response.candidates && response.candidates.length > 0) {
      console.log(response.candidates[0].content.parts[0].text);
      return response.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No response received");
    }
  } catch (error) {
    console.error("Error generating goal:", error);
    throw new Error("Failed to generate goal");
  }
}

module.exports = { getNumericalGoal };
