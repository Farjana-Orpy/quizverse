import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (score !== null || loading) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, loading]);

  const handleOptionChange = (
    questionIndex,
    option
  ) => {
    if (score !== null) return;

    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = async () => {
    let totalScore = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        totalScore++;
      }
    });

    setScore(totalScore);

    // Save Score
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (user) {
        await axios.post(
          "http://localhost:5000/api/scores",
          {
            username: user.username,
            score: totalScore,
            totalQuestions:
              questions.length,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setScore(null);
    setTimeLeft(60);
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="app">
      <div className="quiz-container">
        <h1 className="title">
          QuizVerse 🚀
        </h1>

        {score === null && (
          <div className="timer">
            ⏱ Time Left: {timeLeft}s
          </div>
        )}

        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="question-block"
          >
            <h2 className="question">
              {qIndex + 1}. {q.question}
            </h2>

            <div className="options">
              {q.options.map(
                (option, oIndex) => {
                  let buttonClass =
                    "option-btn";

                  if (score !== null) {
                    if (
                      option === q.answer
                    ) {
                      buttonClass +=
                        " correct";
                    } else if (
                      answers[qIndex] ===
                        option &&
                      option !== q.answer
                    ) {
                      buttonClass +=
                        " wrong";
                    }
                  } else if (
                    answers[qIndex] ===
                    option
                  ) {
                    buttonClass +=
                      " selected";
                  }

                  return (
                    <button
                      key={oIndex}
                      className={buttonClass}
                      onClick={() =>
                        handleOptionChange(
                          qIndex,
                          option
                        )
                      }
                    >
                      {option}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        ))}

        {score === null ? (
          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        ) : (
          <div className="result">
            <h2>Quiz Finished!</h2>

            <h1>
              Score: {score} /{" "}
              {questions.length}
            </h1>

            <button
              className="restart-btn"
              onClick={restartQuiz}
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}