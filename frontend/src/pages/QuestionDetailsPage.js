import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import "./QuestionDetailsPage.css"
function QuestionDetailsPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");

   const navigate = useNavigate()

const handleAddDiscussion = () => {
  if (!newDiscussion.trim()) return;

  const user = JSON.parse(localStorage.getItem("user"));

  const discussionObj = {
    text: newDiscussion,
    userName: user?.name || "Anonymous",
  };

  setDiscussions([...discussions, discussionObj]);
  setNewDiscussion("");
};


const handleComplete = () => {
  const solved = JSON.parse(localStorage.getItem("completed")) || [];
  solved.push(question._id);
  localStorage.setItem("completed", JSON.stringify(solved));
  navigate("/mock-interview");
};

const markAsCompleted = async () => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:5000/api/questions/${id}/complete`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  alert("Marked as completed ✓");
};


  useEffect(() => {
    axiosClient.get(`/questions/${id}`).then((res) => {
      setQuestion(res.data);
    });
  }, [id]);

  if (!question) return <p>Loading...</p>;
   
//   const markCompleted = () => {
//   const completed =
//     JSON.parse(localStorage.getItem("completed")) || [];

//   if (!completed.includes(id)) {
//     completed.push(id);
//     localStorage.setItem("completed", JSON.stringify(completed));
//   }

//   alert("Question marked as completed ✅");
// };


 return (
  <div className="question-container">
   
    <h1 className="question-title">{question.title}</h1>

   
    <div className="question-meta">
      <span className="tag topic">{question.topic}</span>
      <span className={`tag difficulty ${question.difficulty.toLowerCase()}`}>
        {question.difficulty}
      </span>
    </div>

   
    <div className="question-section">
      <h3>Problem Description</h3>
      <p>{question.problem}</p>
    </div>

    
    <div className="question-section">
      <h3>Sample Input</h3>
      <pre>{question.sampleInput || "Not provided"}</pre>
    </div>

    <div className="question-section">
      <h3>Sample Output</h3>
      <pre>{question.sampleOutput || "Not provided"}</pre>
    </div>

    <div className="question-section">
      <h3>Your Answer</h3>
      <textarea
        placeholder="Type your solution here..."
        rows="6"
      />
    </div>

    <div className="question-actions">
      <button className="complete-btn" onClick={markAsCompleted}> ✓ Mark as Completed </button>

      <button onClick={handleComplete} className="submit-btn">Submit Answer</button>
    </div>
    <div className="discussion-section">
  <h3>💬 Discussion</h3>

  <div className="discussion-list">
    {discussions.length === 0 ? (
      <p className="empty-text">No discussions yet. Be the first to share!</p>
    ) : (
      discussions.map((d, index) => (
        <div key={index} className="discussion-card">
          <p className="discussion-text">{d.text}</p>
          <span className="discussion-author">
            — {d.userName}
          </span>
        </div>
      ))
    )}
  </div>

  <div className="add-discussion">
    <textarea
      placeholder="Share your approach, explanation, or doubts..."
      value={newDiscussion}
      onChange={(e) => setNewDiscussion(e.target.value)}
    />

    <button onClick={handleAddDiscussion}>
      Add Discussion
    </button>
  </div>
</div>

  </div>
);

}

export default QuestionDetailsPage;
