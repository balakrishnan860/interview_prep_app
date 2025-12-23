import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import "./DailyChallenge.css";
import { useNavigate } from "react-router-dom";

function DailyChallenge() {
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDaily = async () => {
      const res = await axiosClient.get("/questions/daily");
      setQuestion(res.data);
    };
    fetchDaily();
  }, []);

  if (!question) return null;

  return (
     (
  <div className="daily-card">
    <h3> Daily Challenge</h3>
    <p>{question.title}</p>
    <button className="solve-btn" onClick={() => navigate(`/questions/${question._id}`)}>
      Start Challenge
    </button>
  </div>
)
  );
}

export default DailyChallenge;