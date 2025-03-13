const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create a new contact submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, acceptance } = req.body;

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      message,
      acceptance
    });

    // Save contact to database
    const savedContact = await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: savedContact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
});

module.exports = router; 