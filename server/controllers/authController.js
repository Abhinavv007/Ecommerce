import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
class AuthController{
    static register = async(req,resp)=>{
        const{name,email,address,password,phone,answer} = req.body
        try {
            if(name&&email&&address&&password&&phone&&answer){
                const checkEmail = await userModel.findOne({email})
                if(!checkEmail){
                    const hashedPassword = await bcrypt.hash(password,10)
                    const newUser = new userModel({name,email,answer:answer.toUpperCase(),address,password:hashedPassword,phone})
                    const result = await newUser.save()
                    resp.json({msg:"Registration done successfully",success:true})
                } else{
                resp.json({msg:"Account with this email already exists."})

                }
            } else{
                resp.json({msg:"All fields are required."})
            }
            
        } catch (error) {
            resp.json({ msg: "Some error occured"});
        }
    }

    static login = async(req,resp)=>{
        try {
            const {email,password} = req.body
            if(email&&password){
                const checkEmail = await userModel.findOne({email})
                if(checkEmail){
                    const checkPass = await bcrypt.compare(password,checkEmail.password)
                    if(checkPass){
                        const token = jwt.sign({userID:checkEmail.id},process.env.SECRET,{expiresIn:"1d"})
                        resp.json({ msg: "Logged In Successfully.",token,success:true,id:checkEmail._id ,name:checkEmail.name,role:checkEmail.role});
                    }  else{ 
                     resp.json({ msg: "Email or Password is invalid."});
                    }
                } else{ 
            resp.json({ msg: "Email or Password is invalid."});

                }
            } else{
            resp.json({ msg: "All fields are required"});

            }
            
        } catch (error) {
            resp.json({ msg: error.message});
            
        } 
    }

    static forgotPassword = async(req,resp)=>{
        try {
            const{email,answer,newPassword} = req.body
            if(email&&answer&&newPassword){
                const check = await userModel.findOne({email})
                if(check){
                    const userAnswer = answer.toUpperCase()
                    const checkAnswer = check.answer.toUpperCase()
                    if(userAnswer===checkAnswer){
                        const hashedPassword = await bcrypt.hash(newPassword,10)
                        check.password = hashedPassword
                        await check.save()
                        resp.json({msg:"Password Changed Successfully.",success:true})
                    } else{
                        resp.json({msg:"Answer is Wrong."})
                    }
                } else{
            resp.json({ msg: "Email or Answer is Wrong."});

                }
            } else{
            resp.json({ msg: "All fields are required."});
                
            }
        } catch (error) {
            resp.json({ msg: error.message});
            
        }
    }

    static updateUser = async(req,resp)=>{
        try {
            const {id} = req.params
            const user  = await userModel.findByIdAndUpdate(id,req.body,{new:true})
            resp.json({msg:"Updated Successfully",success:true})
        } catch (error) {
            resp.json({ msg: error.message});
            
        }
    }

    static getUserByID = async(req,resp)=>{
        try {
            const {id} = req.params
            const user = await userModel.findById(id)
            resp.json({msg:user,success:true})

        } catch (error) {
            resp.json({ msg: error.message});
            
        }
    }
}
export default AuthController