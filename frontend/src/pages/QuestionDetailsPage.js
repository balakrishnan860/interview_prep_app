import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./QuestionDetailsPage.css";

function QuestionDetailsPage() {

  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await axiosClient.get(`/questions/${id}`);
      setQuestion(res.data);
    };
    load();
  }, [id]);

  if (!question) return <h2 className="loading-text">Loading Question...</h2>;

  return (
    <div className="details-wrapper">

      <div className="details-box">

        <h1 className="title">{question.title}</h1>

        <div className="info-box">
          <span><b>Topic:</b> {question.topic}</span>
          <span><b>Difficulty:</b> {question.difficulty}</span>
        </div>

        <h2 className="sub-heading">Problem Description</h2>
        <p className="desc">{question.description}</p>

        <h2 className="sub-heading">Sample Input</h2>
        <pre className="sample-box">{question.sampleInput}</pre>

        <h2 className="sub-heading">Sample Output</h2>
        <pre className="sample-box">{question.sampleOutput}</pre>

      </div>

    </div>
  );
}

export default QuestionDetailsPage;
