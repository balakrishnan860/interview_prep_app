import express from "express"
import { addQuestion,getQuestions,getQuestionById,updateQuestion,deleteQuestion,searchQuestions } from "../controllers/question.controllers.js"
import protectRoute from "../middlewares/protectRoute.js"
const router = express.Router()

router.post("/add",protectRoute,addQuestion)
router.get("/get",getQuestions)
router.get("/:id", getQuestionById);
router.put("/update/:id", protectRoute, updateQuestion);
router.delete("/delete/:id", protectRoute, deleteQuestion);
router.get("/search/filters", searchQuestions)





export default router