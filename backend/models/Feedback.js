const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  experienceId: {
    type: Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true,
    min: 1
  },
  occupation: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  enjoyedMost: {
    type: String,
    required: true
  },
  improvements: {
    type: String,
    required: true
  },
  eventFrequency: {
    type: String,
    required: true,
    enum: ['weekly', '2-3-monthly', 'monthly', 'first-time']
  },
  attendReasons: {
    type: [String],
    required: true
  },
  otherAttendReason: {
    type: String
  },
  comparison: {
    type: String
  },
  regularSessions: {
    type: String,
    required: true,
    enum: ['yes', 'no', 'maybe']
  },
  danceStyles: {
    type: [String]
  },
  otherDanceStyle: {
    type: String
  },
  otherInterests: {
    type: String,
    required: true
  },
  appInterest: {
    type: String,
    required: true,
    enum: ['yes', 'maybe', 'no']
  },
  additionalFeedback: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);