const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// CORS Debugging Middleware
app.use((req, res, next) => {
  console.log("🔍 Incoming request:")
  console.log(`   Origin: ${req.headers.origin}`)
  console.log(`   Method: ${req.method}`)
  console.log(`   Path: ${req.path}`)
  console.log(`   Headers:`, JSON.stringify(req.headers, null, 2))

  // Add a listener for the 'finish' event to log response headers
  res.on("finish", () => {
    console.log("📤 Outgoing response:")
    console.log(`   Status: ${res.statusCode}`)
    console.log(`   Headers:`, JSON.stringify(res.getHeaders(), null, 2))
  })

  next()
})

// CORS middleware with explicit headers
app.use((req, res, next) => {
  // Set CORS headers directly
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Credentials", "true")

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    console.log("⚠️ Handling OPTIONS preflight request")
    return res.status(200).end()
  }

  next()
})

// Standard CORS middleware as backup
app.use(
  cors({
    origin: "*", // Allow all origins for debugging
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  }),
)

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

