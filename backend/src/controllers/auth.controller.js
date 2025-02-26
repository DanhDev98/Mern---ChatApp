import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const {email, fullName, password} = req.body
        if(!email || !fullName || !password){
            return res.status(400).json({message:"Không được để trống bất kì ô nào"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "Email đã được đăng ký"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "Mat khau phai dai hon 6 ky ty"})
        }
        //hashpassword
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            fullName,
            password: hashPassword
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            return res.status(200).json({
                id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            })
        }else{
            return res.status(200).json({
                message: "Nguoi dung chua dc tao"
            })
        }
        

    } catch (error) {
        console.log("Error from signup", error.message)
        return res.status(500).json({message: "Internal Error Server"})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body 
        if(!email || !password){
            return res.status(400).json({message:"Khong de trong bat ky o nao"})
        } 
        //check email first
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Email chua dc dang ky"})
        }else{
            // decoded password
            const checkPassword = await bcrypt.compare(password,user.password)
            if(checkPassword){
                generateToken(user._id,res)
                return res.status(200).json({
                    email: user.email,
                    id: user._id,
                    fullName: user.fullName,
                    profilePic: user.profilePic
                })
            }
            return res.status(400).json({message: "Password khong chinh xac"})
            
        }

    } catch (error) {
        console.log("Error from login", error.message)
        return res.status(500).json({message: "Internal Error Server"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt","", {maxAge:0})
        return res.status(200).json({message: "Logout thanh cong"})
    } catch (error) {
        console.log("Error from logout", error.message)
        return res.status(500).json({message: "Internal Error Server"})
    }
}

export const updateProfile = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}