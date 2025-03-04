const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sourceOfInformation: {
    type: String,
    required: true,
    enum: ['Instagram', 'WhatsApp', 'Friends/Family', 'Posters', 'Other']
  },
  whatsappUpdates: {
    type: Boolean,
    required: true,
    default: false
  },
  paymentConfirmed: {
    type: Boolean,
    required: true,
    default: false
  },
  bookingDate: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema); 