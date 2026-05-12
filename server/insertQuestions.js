const mongoose = require("mongoose");
const connectDB = require("./db");
const Question = require("./models/Question");

const questions = [
  {
    question: "What is the capital of Bangladesh?",
    options: ["Dhaka", "Sylhet", "Chittagong", "Khulna"],
    answer: "Dhaka",
  },
  {
    question: "Which language is used in React?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "HighText Machine Language",
      "Hyper Tool Markup Language",
      "Home Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
];

const insertData = async () => {
  try {
    await connectDB();

    await Question.deleteMany();

    await Question.insertMany(questions);

    console.log("Questions Inserted Successfully ✔");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

insertData();