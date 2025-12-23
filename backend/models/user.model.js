import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    profileImg:{
        type:String,
        default:""
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    bookmarks: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }
]
})

const User = mongoose.model("User",UserSchema)
export default User