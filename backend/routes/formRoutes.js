const express = require('express');
const router = express.Router();
const FormEntry = require('../models/formEntry');
const formLimiter = require('../middleware/rateLimiter');
const validateForm = require('../middleware/validateForm');

// POST route to handle form submissions
router.post('/', formLimiter, validateForm, async (req, res, next) => {
  try {
    const newEntry = new FormEntry(req.body);
    await newEntry.save();
    res.status(201).json({
      status: 'success',
      message: 'Form entry saved successfully',
      data: newEntry
    });
  } catch (error) {
    next(error);
  }
});

// GET route to retrieve all form entries
router.get('/', async (req, res, next) => {
  try {
    const entries = await FormEntry.find().select('-__v');
    res.status(200).json({
      status: 'success',
      count: entries.length,
      data: entries
    });
  } catch (error) {
    next(error);
  }
});

// GET route to retrieve a single form entry by email
router.get('/:email', async (req, res, next) => {
  try {
    const entry = await FormEntry.findOne({ email: req.params.email }).select('-__v');
    if (!entry) {
      return res.status(404).json({
        status: 'error',
        message: 'Form entry not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: entry
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
