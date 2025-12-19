import express from "express"
import { addQuestion,getQuestions,getQuestionById,updateQuestion,deleteQuestion,searchQuestions } from "../controllers/question.controllers.js"
import protectRoute from "../middlewares/protectRoute.js"
const router = express.Router()

router.post("/add",protectRoute,addQuestion)
router.get("/get",protectRoute,getQuestions)
router.get("/:id",protectRoute, getQuestionById);
router.put("/update/:id", protectRoute, updateQuestion);
router.delete("/delete/:id", protectRoute, deleteQuestion);
router.get("/search/filters", searchQuestions)





export default router