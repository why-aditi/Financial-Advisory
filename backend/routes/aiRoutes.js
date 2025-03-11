const express = require("express");
const router = express.Router();
const { getInvestmentAdvice } = require("../services/geminiAdv");
const { getNumericalGoal } = require("../services/geminiGoal");

router.post("/investment-advice", async (req, res) => {
  try {
    const userData = req.body;

    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ error: "User data is required" });
    }

    const advice = await getInvestmentAdvice(userData);
    res.json({ advice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Goal analysis route
router.post("/goal-analysis", async (req, res) => {
  try {
    const formData = req.body;

    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({ error: "Form data is required" });
    }

    const goalAnalysis = await getNumericalGoal(formData);
    res.json({ analysis: goalAnalysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
