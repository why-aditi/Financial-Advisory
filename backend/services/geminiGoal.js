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
        You are a financial advisor AI specializing in personalized investment guidance. When responding, analyze the user’s financial background, interests, and risk tolerance. Show how much of their short-term and long-term goals they’ve completed only in percentage. If the user’s background is unknown, offer well-rounded advice suitable for different risk profiles. Avoid generic responses—give practical, data-driven recommendations that align with the user's financial aspirations.
  
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
