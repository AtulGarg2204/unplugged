const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      experienceId,
      firstName,
      lastName,
      gender,
      phoneNumber,
      email,
      age,
      sourceOfInformation,
      whatsappUpdates,
      paymentConfirmed
    } = req.body;

    // Verify that the experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Create the booking
    const booking = new Booking({
      experienceId,
      firstName,
      lastName,
      gender,
      phoneNumber,
      email,
      age,
      sourceOfInformation,
      whatsappUpdates,
      paymentConfirmed
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get all bookings for an experience
router.get('/experience/:experienceId', async (req, res) => {
  try {
    const bookings = await Booking.find({ experienceId: req.params.experienceId });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

module.exports = router; 