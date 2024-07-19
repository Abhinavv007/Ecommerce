import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()
const dbConnect = async()=>{
     const connect = await mongoose.connect(process.env.MONGO_URL)
     if(connect){
        console.log("Database Connected");
     } else{
        console.log("Failed to Connect")
     }
}
export default dbConnect