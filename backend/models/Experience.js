const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  dayOfWeek: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  registrationFee: {
    type: Number,
    required: true
  },
  artistName: {
    type: String,
    required: true,
    trim: true
  },
  artistInstagramId: {
    type: String,
    required: true,
    trim: true
  },
  artistInstagramLink: {
    type: String,
    required: true,
    trim: true
  },
  aboutArtist: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: ''
  },
  numberOfSeats: {
    type: Number,
    required: true
  },
  googleFormLink: {
    type: String,
    required: true,
    default: 'https://l6ae6wgo.forms.app/unplugged-bhangra'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Experience', ExperienceSchema);