const express = require('express');
const router = express.Router();
const Space = require('../models/Space');

// Create a new space listing
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      usageType,
      hourlyRate
    } = req.body;

    const space = new Space({
      name,
      email,
      phone,
      location,
      usageType,
      hourlyRate: parseFloat(hourlyRate)
    });

    await space.save();

    res.status(201).json({
      success: true,
      message: 'Space listing created successfully',
      data: space
    });
  } catch (error) {
    console.error('Error in space listing:', error);
    res.status(500).json({
      success: false,
      message: 'Error in creating space listing',
      error: error.message
    });
  }
});

module.exports = router; 