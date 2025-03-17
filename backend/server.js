const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
const allowedOrigins = [
  'https://unplugged123.netlify.app',
  'https://unplugged-oqyy.vercel.app',
  'https://unplugged-1.vercel.app',
  'http://localhost:3005' // Add your local development URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const experienceRoutes = require('./routes/Experiences');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');
const artistRoutes=require('./routes/artists');
const spaceRoutes=require('./routes/spaces');
const feedbackRoutes=require('./routes/feedback');
// Use routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/feedback', feedbackRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});