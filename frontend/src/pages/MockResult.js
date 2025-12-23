import { useLocation } from "react-router-dom";

function MockResult() {
  const { state } = useLocation();

  return (
    <div>
      <h2>Mock Interview Result</h2>
      <p>Score: {state.score} / {state.total}</p>
      <p>Answered: {state.answered}</p>
    </div>
  );
}
