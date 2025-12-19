# Interview Preparation Platform – Backend (Node + Express + MongoDB)

This backend is part of a full-stack Interview Preparation Platform built using MERN stack technologies.  
It provides secure user authentication, protected question creation, advanced searching and filtering, and complete CRUD operations for managing interview questions.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- bcrypt
- CORS
- dotenv

---

## Features

### Authentication
- Register account
- Login with JWT token
- Protected routes
- HttpOnly cookies
- Password hashing

### Question Management
- Add interview questions (protected)
- Get all questions
- Search questions by keywords
- Filter by topic & difficulty
- Get question by ID
- Update question (protected)
- Delete question (protected)

---

## Project Structure

backend/
│── controllers/
│ └── auth.controllers.js
│ └── question.controllers.js
│
│── models/
│ └── user.model.js
│ └── question.model.js
│
│── routes/
│ └── auth.route.js
│ └── question.route.js
│
│── middlewares/
│ └── protectRoute.js
│
│── db/
│ └── connectDB.js
│
│── server.js
│── package.json
│── .env