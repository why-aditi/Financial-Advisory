const express = require('express');
const router = express.Router();
const FormEntry = require('../models/formEntry'); // Fixed case sensitivity

// POST route to handle form submissions
router.post('/', async (req, res) => {
  try {
    const newEntry = new FormEntry(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Form entry saved' });
  } catch (error) {
    console.error("Error saving form entry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET route to retrieve all form entries
router.get('/', async (req, res) => {
  try {
    const entries = await FormEntry.find();
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
