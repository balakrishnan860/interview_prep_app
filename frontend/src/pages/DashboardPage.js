import React, { useState,useEffect,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {Link} from 'react-router-dom'
import "./DashboardPage.css";
import axiosClient from "../api/axiosClient";
import DailyChallenge from "./DailyChallenge";
import { useNavigate } from "react-router-dom";
import Progress from "../components/Progress";


function DashboardPage() {
     const { user } = useContext(AuthContext);
    const [daily, setDaily] = useState(null);
    const [questions,setQuestions] = useState([])

const navigate = useNavigate()

useEffect(() => {
  axiosClient.get("/questions/daily")
    .then(res => setDaily(res.data));
}, []);

useEffect(() => {
  fetchQuestions();
}, []);

const fetchQuestions = async () => {
  try {
    const res = await axiosClient.get("/questions");
    setQuestions(res.data);
  } catch (err) {
    console.error(err);
  }
};
// const user = JSON.parse(localStorage.getItem("user"));

const totalQuestions = questions.length;

const completedQuestions = questions.filter(q =>
  q.completedBy?.includes(user._id)
).length;

    return (
       
    <div className="dashboard-container">
            <div className="dashboard-box">
                <h2>Welcome, {user?.fullname} 👋</h2>
                <p>Email: {user?.email}</p>
                <p>Username: {user?.username}</p>
        </div>
            <div className="container">
            <DailyChallenge/>
            <Progress total={totalQuestions} completed={completedQuestions}/>
   
            <div className="dashboard-card">
               <h3>🧪 Mock Interview</h3>
                 <p>Practice real interview with timer</p>
           <button onClick={() => navigate("/mock-setup")}> Start Mock Interview</button>
            </div>
        </div>
    </div>
    );
}

export default DashboardPage;
