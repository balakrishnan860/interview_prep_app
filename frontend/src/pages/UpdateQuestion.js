import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import './UpdateQuestion.css'

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    problem: "",
    topic: "",
    difficulty: "",
    sampleInput: "",
    sampleOutput: ""
  });

  const loadExisting = async () => {
    const { data } = await axiosClient.get(`/questions/${id}`);
    setForm({
      title: data.title,
      problem: data.problem,
      topic: data.topic,
      difficulty: data.difficulty,
      sampleInput: data.sampleInput,
      sampleOutput: data.sampleOutput,
    });
  };

  useEffect(() => {
    loadExisting();
  }, [id]);

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);


await axiosClient.put(
  `/questions/update/${id}`,
  form,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);



    alert("Updated Successfully!");
    navigate("/questions");
  } catch (err) {
    console.log("FULL ERROR:", err);
    console.log("RESPONSE:", err.response);
    console.log("DATA:", err.response?.data);
    console.log("STATUS:", err.response?.status);
    alert("Update failed");
  }
};


  return (
    <div className="update-container">
  <div className="update-box">
    <h2>Update Question</h2>

    <input
      name="title"
      value={form.title}
      onChange={handleChange}
      placeholder="Title"
    />

    <textarea
      name="problem"
      value={form.problem}
      onChange={handleChange}
      placeholder="Problem Description"
    />

    <input
      name="topic"
      value={form.topic}
      onChange={handleChange}
      placeholder="Topic"
    />

    <select
      name="difficulty"
      value={form.difficulty}
      onChange={handleChange}
    >
      <option value="">Select Difficulty</option>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>

    <input
      name="sampleInput"
      value={form.sampleInput}
      onChange={handleChange}
      placeholder="Sample Input"
    />

    <input
      name="sampleOutput"
      value={form.sampleOutput}
      onChange={handleChange}
      placeholder="Sample Output"
    />

    <button onClick={handleUpdate}>
      Update Question
    </button>
  </div>
</div>
  );
};

export default UpdateQuestion;
