
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/courseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Backend home route
app.get("/", (req, res) => {
  res.send("Course Management Backend is Running Successfully!");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Course routes
app.use("/api/courses", routes);

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/course_management"
)
.then(() => {
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
});
