const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

async function getInvestmentAdvice(userData) {
  try {
    const prompt = `
        You are a financial advisor AI specializing in providing tailored investment tips. 
        Consider the user's background, interests, and risk tolerance. Provide clear, concise, 
        and practical advice for the selected investment option, balancing risk, returns, 
        and long-term viability. If the user's background is unknown, give well-rounded 
        advice suitable for different risk appetites. If asked anything unrelated, politely 
        redirect the conversation to investments.
  
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
    console.error("Error generating investment advice:", error);
    throw new Error("Failed to generate investment advice");
  }
}

module.exports = { getInvestmentAdvice };
