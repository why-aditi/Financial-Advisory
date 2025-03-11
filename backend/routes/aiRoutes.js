const express = require("express");
const router = express.Router();
const { getInvestmentAdvice } = require("../services/gemini"); // Make sure this is correct

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

module.exports = router;
