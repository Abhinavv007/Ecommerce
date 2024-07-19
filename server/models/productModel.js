import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    quantity : Number, 
    photo:String,
    shipping:Boolean

},{timestamps:true})

const productModel = mongoose.model("product",productSchema)
export default productModel