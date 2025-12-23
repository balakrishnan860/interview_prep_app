import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import "./QuestionsPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function QuestionsPage() {

  const [questions, setQuestions] = useState([]);
  const [topic, setTopic] = useState("");
const [difficulty, setDifficulty] = useState("");

const navigate = useNavigate()
const user = JSON.parse(localStorage.getItem("user"))
 const isCompleted = questions.completedBy?.includes(user._id);


const fetchQuestions = async () => {
    const res = await axiosClient.get("/questions", {
     params : {topic,difficulty}
     });
    setQuestions(res.data);
    };

  useEffect(() => {
  fetchQuestions();
}, [topic, difficulty]);

// const handleVote = async (questionId, vote) => {
//   await axiosClient.post(`/questions/${questionId}/vote`, {
//     vote:vote
//   });
//   fetchQuestions(); // refresh list
// };


   const handleBookmark = async (questionId) => {
    try {
      await axiosClient.post(
    "/auth/bookmark",
    { questionId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  fetchQuestions()
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  
};

  return (
    <div className="questions-container">

      <h1 className="page-title">DSA Problem Set</h1>
      <div className="filter-bar">
  <select className="selection" value={topic} onChange={(e) => setTopic(e.target.value)}>
    <option value="">All Topics</option>
    <option value="Array">Array</option>
    <option value="String">Strings</option>
    <option value="Linked List">Linked List</option>
  </select>

  <select className="selection" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
    <option value="">All Difficulty</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>
</div>

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
            <Link to={`/questions/${q._id}`} className="view-btn">Open</Link>
            <Link to={`/update-question/${q._id}`}>
              <button className="edit-btn">Edit</button>
            </Link>
            <button className="selection-1" onClick={(e) =>{ 
              e.stopPropagation();
              handleBookmark(q._id)}}>⭐</button>
              <td>
                {isCompleted && (
                   <span className="completed-badge">✓ Completed</span>
                     )}
              </td>
              {/* <button onClick={() => handleVote(q._id, 1)}>👍</button>
              <span>{q.votes}</span>
              <button onClick={() => handleVote(q._id, -1)}>👎</button> */}


          </div>
        ))}
      </div>

    </div>
  );
}

export default QuestionsPage;
