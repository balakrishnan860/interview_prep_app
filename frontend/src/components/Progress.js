import "./Progress.css";

function Progress({ total, completed }) {
  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-dashboard">
      <h3>📊 Progress Overview</h3>

      <div className="stats">
        <div>
          <span className="number">{completed}</span>
          <span className="label">Completed</span>
        </div>

        <div>
          <span className="number">{total}</span>
          <span className="label">Total</span>
        </div>

        <div>
          <span className="number">{percent}%</span>
          <span className="label">Progress</span>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;
