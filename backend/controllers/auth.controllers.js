import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken.js"
export const signup = async(req,res)=>{
    try {
        const {username,fullname,email,password} = req.body

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"})
        }

        const existingEmail = await User.findOne({email})
if(existingEmail){
  return res.status(400).json({error:"Email already exists"})
}

const existingUsername = await User.findOne({username})
if(existingUsername){
  return res.status(400).json({error:"Username already exists"})
}

        if(password.length<6){
            return res.status(400).json({error:"Password must have atleast 6 characters"})
        }

        // hashing the password
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            fullname,
            email,
            password: hashedPassword
        })

        if (newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(200).json({
              _id: newUser._id,
              username:newUser.username,
              fullname:newUser.fullname,
              email:newUser.email,
              profileImg:newUser.profileImg,
              role:newUser.role,
              createdAt:newUser.createdAt
            })
        }else{
            res.status(400).json(400)({error:"Invalid user data"})
        }
    } catch (error) {
        console.log(`error in signup controller ${error}`)
        res.status(500).json({error:"Internal server error"})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        console.log("BODY =>",req.body)
        const user = await User.findOne({email})
        const ispasswordCorrect = await bcrypt.compare(password,user?.password || "")

        if(!user || !ispasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateToken(user._id,res)

        res.status(200).json({
            user:{
             _id: user._id,
              username:user.username,
              fullname:user.fullname,
              email:user.email,
              profileImg:user.profileImg,
              role:user.role,
              createdAt:user.createdAt
            }
        })
    } catch (error) {
        console.log(`error in login controller ${error}`)
        res.status(500).json({error:"Internal server error"})
    }
}

export const logout = async(req,res)=>{
   try {
      res.cookie("jwt","",{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        expires:new Date(0)
      })
      res.status(200).json({message:"Logout successfully"})
   } catch (error) {
    console.log(`error in logout controller ${error}`)
        res.status(500).json({error:"Internal server error"})
   }
}

export const getMe = async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.user._id}).select("-password")
        res.status(200).json(user)
    } catch (error) {
         console.log(`error in logout controller ${error}`)
        res.status(500).json({error:"Internal server error"})
    }
}