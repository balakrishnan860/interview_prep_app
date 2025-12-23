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
        console.log("BODY RECEIVED:",req.body)
        const { id } = req.params;
        const { title, problem, topic, difficulty, sampleInput, sampleOutput } = req.body;

        // find question exists
        const question = await questionModel.findById(id);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

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

export const getDailyChallenge = async (req, res) => {
  try {
    const questions = await questionModel.find();

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions available" });
    }

    const today = new Date().getDate();
    const index = today % questions.length;

    const dailyQuestion = questions[index];

    res.json(dailyQuestion);
  } catch (err) {
    res.status(500).json({ error: "Daily challenge failed" });
  }
};

export const getMockInterviewQuestions = async (req, res) => {
  try {
    const count = Number(req.query.count) || 5;

    const questions = await questionModel.aggregate([
      { $sample: { size: count } }
    ]);

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to load mock interview" });
  }
};

export const markQuestionCompleted = async (req, res) => {
  try {
    const questionId = req.params.id;
    const userId = req.user._id;

    const question = await questionModel.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (!question.completedBy.includes(userId)) {
      question.completedBy.push(userId);
      await question.save();
    }

    res.json({ message: "Question marked as completed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addingQuestion = async (req, res) => {
  try {
    const question = await questionModel.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: "Failed to add question" });
  }
};

// export const voteQuestion = async (req, res) => {
//     console.log("USER:",req.user)
//     console.log("VOTE BODY:",req.body)
//   const { vote } = req.body; // +1 or -1
//   const userId = req.user.id;

//   const question = await questionModel.findById(req.params.id);

//   const alreadyVoted = question.votedBy.find(
//     (v) => v.userId.toString() === userId.toString()
//   );

//   if (alreadyVoted) {
//     return res.json({ votes:question.votes });
//   }

//   question.votes += vote;
//   question.votedBy.push({ userId, vote });

//   await question.save();
//   res.json(question);
// };
