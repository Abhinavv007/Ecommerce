import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
    phone:Number,
    role:{
        type:Number,
        default:0
    },
    answer:String


},{timestamps:true})

const userModel = mongoose.model("users",userSchema)
export default userModel