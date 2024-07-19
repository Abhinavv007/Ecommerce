import express from "express"
import dbConnect from "./config/db.js"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import cors from "cors"
dbConnect()
const app = express() 
app.use(cors())
app.use(express.json())
app.use("/api/auth",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
app.use(express.static("public/upload"))
app.use(express.json())
app.get("/",(req,resp)=>{
    resp.json("Hello From Backend") 
})
 
app.listen(8080,()=>{
    console.log("Server Started");
})   