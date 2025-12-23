import express from "express";
import {
  addQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
  getDailyChallenge,
  getMockInterviewQuestions,
  markQuestionCompleted,
  addingQuestion,
} from "../controllers/question.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, addQuestion);
router.post("/", protectRoute, addingQuestion);
// router.post("/:id/vote", protectRoute, voteQuestion);
router.get("/", getQuestions);                
router.get("/search/filters", searchQuestions);
router.get("/daily",getDailyChallenge)
router.get("/mock", protectRoute, getMockInterviewQuestions);
router.post("/:id/complete",protectRoute,markQuestionCompleted);
router.get("/:id", getQuestionById);
router.put("/update/:id", protectRoute, updateQuestion);
router.delete("/delete/:id", protectRoute, deleteQuestion);


export default router;

