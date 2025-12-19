import questionModel from "../models/question.model.js"

export const addQuestion = async(req,res)=>{
 try {
    const {title,problem,difficulty,topic,sampleInput,sampleOutput} = req.body
    console.log("REQ BODY -->",req.body)
    const exists = await questionModel.findOne({title})
    if(exists){
        return res.status(400).json({error:"Question already exists"})
    }
    console.log("REQ USER",req.user)
    const newQuestion = await questionModel.create({
        title,
        problem,
        difficulty,
        topic,
        sampleInput,
        sampleOutput,
        createdBy:req.user._id
    })
    
    res.status(201).json(newQuestion)

 } catch (error) {
    res.status(500).json({error:"Internal server Error"})
 }
}


export const getQuestions = async(req,res)=>{
   try {
    const {difficulty,topic,search} = req.query
    let filter = {}
    if(topic){
        filter.topic = topic
    }
    if(difficulty){
        filter.difficulty = difficulty
    }
    if(search){
        filter.title = {$regex:search,$options:"i"}
    }
    const questions = await questionModel.find(filter).sort({createdAt:-1})
    res.status(200).json(questions)

   } catch (error) {
    res.status(500).json({error:"Internal server Error"})
   }
}

export const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await questionModel.findById(id);

        if (!question) {
            return res.status(404).json({ error: "Question not found" })
        }

        res.status(200).json(question);

    } catch (error) {
        console.log("Error in getQuestionById", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, problem, topic, difficulty, sampleInput, sampleOutput } = req.body;

        // find question exists
        const question = await questionModel.findById(id);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        // update fields
        question.title = title || question.title;
        question.problem = problem || question.problem;
        question.topic = topic || question.topic;
        question.difficulty = difficulty || question.difficulty;
        question.sampleInput = sampleInput || question.sampleInput;
        question.sampleOutput = sampleOutput || question.sampleOutput;

        await question.save();

        return res.status(200).json(question);

    } catch (error) {
        console.log("Error in updateQuestion:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await questionModel.findById(id);

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        await question.deleteOne();

        return res.status(200).json({ message: "Question deleted successfully" });

    } catch (error) {
        console.log("Error in deleteQuestion:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const searchQuestions = async (req, res) => {
    try {
        const { keyword, topic, difficulty } = req.query;

        const query = {};

        // search keyword in title or problem text
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { problem: { $regex: keyword, $options: "i" } }
            ];
        }

        // topic filter
        if (topic) {
            query.topic = topic;
        }

        // difficulty filter
        if (difficulty) {
            query.difficulty = difficulty;
        }

        const questions = await questionModel.find(query);

        res.status(200).json(questions);

    } catch (error) {
        console.log("Error in searchQuestions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
