const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

// Create a new artist registration
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      city,
      spaceType,
      activityType
    } = req.body;

    const artist = new Artist({
      name,
      email,
      phone,
      city,
      spaceType,
      activityType
    });

    await artist.save();

    res.status(201).json({
      success: true,
      message: 'Artist registration successful',
      data: artist
    });
  } catch (error) {
    console.error('Error in artist registration:', error);
    res.status(500).json({
      success: false,
      message: 'Error in artist registration',
      error: error.message
    });
  }
});

module.exports = router; 