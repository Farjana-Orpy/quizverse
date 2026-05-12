const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

// GET all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD new question
router.post("/", async (req, res) => {
  try {
    const { question, options, answer } = req.body;

    const newQuestion = new Question({
      question,
      options,
      answer,
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;