import { useNavigate } from "react-router-dom";
import "./MockInterviewSetup.css";

function MockInterviewSetup() {
  const navigate = useNavigate();

  const startInterview = () => {
    navigate("/mock-interview");
  };

  return (
    <div className="mock-setup">
      <h2>🧪 Timed Mock Interview</h2>

      <select>
        <option>Array</option>
        <option>String</option>
        <option>Stack</option>
      </select>

      <select>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button onClick={startInterview}>Start Interview</button>
    </div>
  );
}

export default MockInterviewSetup;
