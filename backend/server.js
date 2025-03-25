const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Middleware
const allowedOrigins = [
  "https://unplugged123.netlify.app",
  "https://unplugged-oqyy.vercel.app",
  "https://unplugged-1.vercel.app",
  "http://localhost:3001",
]

// CORS middleware with proper error handling
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true)

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        console.log("CORS blocked origin:", origin)
        // Instead of throwing an error, just log it and allow with a warning
        callback(null, true)
        // If you want to strictly enforce CORS:
        // callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "X-CSRF-Token",
      "X-Requested-With",
      "Accept",
      "Accept-Version",
      "Content-Length",
      "Content-MD5",
      "Content-Type",
      "Date",
      "X-Api-Version",
      "Authorization",
    ],
  }),
)

// Handle OPTIONS requests explicitly
app.options("*", cors())

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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err))

// Define port
const PORT = process.env.PORT || 5000

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

