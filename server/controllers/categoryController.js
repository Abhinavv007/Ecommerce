import categoryModel from "../models/categoryModel.js"

class CategoryController{
    static createCategory = async(req,resp)=>{
        const{name} = req.body
        if(name){
            const check = await categoryModel.findOne({name})
            if(!check){
                const newCat = new categoryModel({name})
                await newCat.save()
            resp.json({msg:"Category Created Successfully.",success:true})
                
            } else{
            resp.json({msg:"Category already exists."})

            }
        } else{
            resp.json({msg:"Please fill the required name field."})
        }
    }

    static updateCategory = async(req,resp)=>{ 
        const {id} = req.params 
        if(!id){
            resp.json({msg:"ID is required."}) 
        }
        const {name} = req.body
        const category = await categoryModel.findByIdAndUpdate(id,{name},{new:true})
        resp.json({msg:"Updated Successfully",success:true})
    }

    static deleteCategory = async(req,resp)=>{
        const {id} = req.params
        if(!id){
            resp.json({msg:"ID is required."})

        }
        const category = await categoryModel.findByIdAndDelete(id)
        resp.json({msg:"Deleted Successfully",success:true})
    }

    static getAllCategories=async(req,resp)=>{
        try {
            const categories = await categoryModel.find({})
            resp.json({msg:categories,success:true})
        } catch (error) {
            resp.json({msg:error.message})
        }
    }

    static getSingleCategory = async(req,resp)=>{
        try {
            const {id} = req.params
            const category = await categoryModel.findById(id)
            resp.json({msg:category})
        } catch (error) {
            resp.json({msg:error.message})
        }
    }
}
export default CategoryController