const express = require("express");

const router = express.Router();

const Score = require("../models/Score");

// SAVE SCORE
router.post("/", async (req, res) => {
  try {
    const {
      username,
      score,
      totalQuestions,
    } = req.body;

    const newScore = new Score({
      username,
      score,
      totalQuestions,
    });

    await newScore.save();

    res.status(201).json({
      message: "Score saved",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET LEADERBOARD
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Score.find()
      .sort({ score: -1 })
      .limit(10);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;