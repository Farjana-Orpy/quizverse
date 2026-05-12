require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");
const scoreRoutes = require("./routes/scoreRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("QuizVerse API Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});