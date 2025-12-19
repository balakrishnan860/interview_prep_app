import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./DashboardPage.css";

function DashboardPage() {
    const { user } = useContext(AuthContext);

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h2>Welcome, {user?.fullname} 👋</h2>
                <p>Email: {user?.email}</p>
                <p>Username: {user?.username}</p>
            </div>
        </div>
    );
}

export default DashboardPage;
