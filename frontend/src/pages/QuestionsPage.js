import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import "./QuestionsPage.css";
import { Link } from "react-router-dom";

function QuestionsPage() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await axiosClient.get("/questions/get");
      setQuestions(res.data);
    };
    loadData();
  }, []);

  return (
    <div className="questions-container">

      <h1 className="page-title">DSA Problem Set</h1>

      <div className="questions-table">
        <div className="questions-header">
          <span>Title</span>
          <span>Topic</span>
          <span>Difficulty</span>
          <span>View</span>
        </div>

        {questions.map(q => (
          <div className="questions-row" key={q._id}>
            <span>{q.title}</span>
            <span>{q.topic}</span>
            <span className={`diff ${q.difficulty.toLowerCase()}`}>
              {q.difficulty}
            </span>
            <Link to={`/question/${q._id}`} className="view-btn">Open</Link>
          </div>
        ))}
      </div>

    </div>
  );
}

export default QuestionsPage;
