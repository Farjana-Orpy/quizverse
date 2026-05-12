import { useState } from "react";

export default function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      question,
      options: options.split(","),
      answer,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestion),
        }
      );

      if (response.ok) {
        alert("Question Added Successfully ✔");

        setQuestion("");
        setOptions("");
        setAnswer("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1>Add Quiz Question</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Options separated by commas"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Correct Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />

        <button type="submit">
          Add Question
        </button>
      </form>
    </div>
  );
}