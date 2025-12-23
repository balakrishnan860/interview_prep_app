import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  problem: {
    type: String,
    required: true
  },

  topic: {
    type: String,
    required: true,
    enum: [
      "Array",
      "String",
      "Linked list",
      "DP",
      "Graphs",
      "Trees",
      "Math",
      "Binary Search",
      "SQL",
      "React",
      "JS",
      "Other"
    ]
  },

  difficulty: {
    type: String,
    required: true,
    enum: ["Easy", "Medium", "Hard"]
  },

  sampleInput: {
    type:String,
  },

  sampleOutput: {
    type:String,
  },

  explanation: {
    type: String,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
], votes: {
    type: Number,
    default: 0,
  },

  votedBy: [
    {
      userId: String,
      vote: Number ,
    }
  ]



});

export default mongoose.model("Question", questionSchema);
  