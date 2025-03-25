const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Define allowed origins
const allowedOrigins = [
  'https://unplugged-oqyy.vercel.app',
  'https://unplugged-1.vercel.app',
  'http://localhost:3000'
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log(`Origin ${origin} not allowed by CORS`);
      callback(null, true); // Allow for debugging, change to false in production
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight requests specifically
app.options('*', cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Import routes
const experienceRoutes = require("./routes/Experiences")
const bookingRoutes = require("./routes/bookings")
const contactRoutes = require("./routes/contact")
const artistRoutes = require("./routes/artists")
const spaceRoutes = require("./routes/spaces")
const feedbackRoutes = require("./routes/feedback")

// Use routes
app.use("/api/experiences", experienceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/artists", artistRoutes)
app.use("/api/spaces", spaceRoutes)
app.use("/api/feedback", feedbackRoutes)

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Unplugged API is running');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server'
  });
});

// Define port
const PORT = process.env.PORT || 5000

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})