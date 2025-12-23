import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import './AddQuestion.css'
const AddQuestion = () => {

  const [form, setForm] = useState({
    title:"",
    problem:"",
    topic:"",
    sampleInput:"",
    sampleOutput:"",
    difficulty:""
  });

  const navigate = useNavigate();
  
  const handleChange = (e)=>{
    const {name,value} = e.target
    setForm({...form,[name]:value})
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    console.log("USING TOKEN:", token);

    const res = await axiosClient.post(
      "/questions/add",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("ADD QUESTION RESPONSE:", res.data);
    alert("Question added successfully");
  } catch (err) {
    console.log("ADD QUESTION ERROR:", err.response?.data || err);
    alert("Add failed");
  }
};


  return(
    <div className="add-container">
  <div className="add-box">
    <h2>Add Question</h2>

    <input
      name="title"
      placeholder="Title"
      value={form.title}
      onChange={handleChange}
    />

    <textarea
      name="problem"
      placeholder="Problem Description"
      value={form.problem}
      onChange={handleChange}
    />

    <input
      name="topic"
      placeholder="Topic"
      value={form.topic}
      onChange={handleChange}
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
      placeholder="Sample Input"
      value={form.sampleInput}
      onChange={handleChange}
    />

    <input
      name="sampleOutput"
      placeholder="Sample Output"
      value={form.sampleOutput}
      onChange={handleChange}
    />

    <button onClick={handleSubmit}>
      Add Question
    </button>
  </div>
</div>
  );
};

export default AddQuestion;
