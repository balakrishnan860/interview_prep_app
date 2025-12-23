import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import './MockInterview.css'
function MockInterview() {
  const [questions, setQuestions] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [timeLeft, setTimeLeft] = useState(() => {
  const saved = localStorage.getItem("mockTime");
  return saved ? Number(saved) : 30 * 60;
});


 const navigate = useNavigate();

const openQuestion = (id) => {
  navigate(`/question/${id}`, {
    state: { fromMock: true }
  });
};

  const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};



const exitInterview = () => {
  localStorage.removeItem("mockTime");
  navigate("/dashboard");
};

useEffect(() => {
  const solved = JSON.parse(localStorage.getItem("completed")) || [];
  setCompleted(solved);
}, []);

  useEffect(() => {
    axiosClient.get("/questions").then((res) => {
      setQuestions(res.data);
    });
  }, []);
  useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        localStorage.removeItem("mockTime");
        alert("Interview finished");
        return 0;
      }
      localStorage.setItem("mockTime", prev - 1);
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  const handleUnload = () => {
    localStorage.removeItem("mockTime");
  };

  window.addEventListener("popstate", handleUnload);

  return () => {
    window.removeEventListener("popstate", handleUnload);
  };
}, []);


  return (
    <div className="mock-container">

  <div className="mock-header">
    <h2>Mock Interview</h2>
    <span className="timer">⏱ Time Left: {formatTime(timeLeft)}</span>
  </div>

  <div className="mock-list">
    {questions.map((q, index) => (
      <div className="mock-row" key={q._id}>
        <span>{index + 1}. {q.title}</span>
        <button onClick={() => openQuestion(q._id)}>Open</button>
      </div>
    ))}
  </div>

  <button className="exit-btn" onClick={exitInterview}>
    Exit Interview
  </button>

</div>


  );
}

export default MockInterview;
