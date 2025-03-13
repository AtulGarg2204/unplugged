const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Experience = require('../models/Experience');

router.post('/', async (req, res) => {
    try {
      const {
        experienceId,
        name,
        email,
        age,
        occupation,
        area,
        rating,
        enjoyedMost,
        improvements,
        eventFrequency,
        attendReasons,
        otherAttendReason,
        comparison,
        regularSessions,
        danceStyles,
        otherDanceStyle,
        otherInterests,
        appInterest,
        additionalFeedback
      } = req.body;
  
      // Validate required fields
      if (!experienceId || !name || !email || !age || !occupation || !rating || 
          !enjoyedMost || !improvements || !eventFrequency || !attendReasons || 
          !regularSessions || !otherInterests || !appInterest) {
        return res.status(400).json({ msg: 'Please include all required fields' });
      }
  
      // Check if experience exists
      const experience = await Experience.findById(experienceId);
      if (!experience) {
        return res.status(404).json({ msg: 'Experience not found' });
      }
  
      // Create new feedback
      const newFeedback = new Feedback({
        experienceId,
        name,
        email,
        age: parseInt(age, 10),
        occupation,
        area,
        rating: parseInt(rating, 10),
        enjoyedMost,
        improvements,
        eventFrequency,
        attendReasons: Array.isArray(attendReasons) ? attendReasons : [attendReasons],
        otherAttendReason,
        comparison,
        regularSessions,
        danceStyles: Array.isArray(danceStyles) ? danceStyles : danceStyles ? [danceStyles] : [],
        otherDanceStyle,
        otherInterests,
        appInterest,
        additionalFeedback
      });
  
      const feedback = await newFeedback.save();
      res.status(201).json(feedback);
    } catch (err) {
      console.error('Error submitting feedback:', err.message);
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  });

  module.exports = router; 