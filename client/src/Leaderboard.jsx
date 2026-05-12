import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/scores"
      );

      setScores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="quiz-container">
        <h1 className="title">
          🏆 Leaderboard
        </h1>

        {scores.length === 0 ? (
          <h2>No scores yet</h2>
        ) : (
          scores.map((item, index) => (
            <div
              key={index}
              className="leaderboard-item"
            >
              <h3>
                #{index + 1} —{" "}
                {item.username}
              </h3>

              <p>
                Score: {item.score} /{" "}
                {item.totalQuestions}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}