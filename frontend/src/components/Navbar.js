import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    
    const navigate = useNavigate();
    if (!user) return null
    const handleLogout = async () => {
  await axiosClient.post("/auth/logout");
  logout(); 
  navigate("/login");
};

    return (
        <nav className="navbar">
            <h1 className="logo">DSA App</h1>

            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/questions">Questions</Link>
                <Link to="/add-question">Add Question</Link>
                {user && (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
