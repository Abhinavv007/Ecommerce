import productModel from "../models/productModel.js"

class ProductController{

    static createProduct = async(req,resp)=>{
        try {
            const{name,description,price,category,quantity,shipping} = req.body
            const{filename} = req.file
            if(name&&description&&price&&category&&quantity&&shipping&&filename){
                const newProd = new productModel({
                    name,description,price,category,quantity,shipping,photo:filename
                })
                const result = await newProd.save()
                resp.json({msg:"Product created Successfully.",success:true})
            } else{
                resp.json({msg:"All fields are required."})
            }

        } catch (error) {
            resp.json({msg:error.message})
        }
    }

    static getAllProds = async(req,resp)=>{
        try {
           const allProds = await productModel.find({}).sort({createdAt:-1}).limit(12)
           resp.json({msg:allProds,success:true})

        } catch (error) {
            resp.json({msg:error.message})
        }
    }

    static getProd = async(req,resp)=>{
        try {
            const{id} = req.params
           const prod = await productModel.findById(id)
           resp.json({msg:prod , success:true})

        } catch (error) {
            resp.json({msg:error.message})
        }
    }

    static deleteProd = async(req,resp)=>{
        try {
            const{id} = req.params
           const prod = await productModel.findByIdAndDelete(id)
           if(prod){
            resp.json({msg:"Deleted Successfully.",success:true})

           } else{
           resp.json({msg:"Failed to Delete"})

           }

        } catch (error) {
            resp.json({msg:error.message})
        }
    }

    static EditProduct = async(req,resp)=>{
        try {
            const {id} = req.params
            const{name,description,price,category,quantity,shipping} = req.body
            let updateData = { name, description, price, category, quantity, shipping };
            if (req.file) {
                updateData.photo = req.file.filename;
            }
    
            const edit  = await productModel.findByIdAndUpdate(id,updateData,{new:true})
            if(edit){
            resp.json({msg:"Changes Saved Successfully",edit,success:true})

            } else{
            resp.json({msg:"Some error occured"})

            }
         } catch (error) {
            resp.json({msg:error.message})
            
        }
    }

    static search = async(req,resp)=>{
        try {
            const {search} = req.query || ""

            const query = {
                name:{$regex:search,$options:"i"}
            }
            const data = await productModel.find(query)
            resp.json({msg:data,success:true})
            
        } catch (error) {
            resp.json({msg:error.message})
            
        }
    }

    static filterCat = async (req, resp) => {
        const { category } = req.query || "";
      
        try {
          const query = { category: category }; 
          const data = await productModel.find(query);
          resp.json({ msg: data, success: true });
        } catch (error) {
          resp.json({ msg: error.message });
        }
      };

      static pagination = async (req, resp) => {
        try {
            const { currentPage } = req.query || 1;
            const resultPerPage = 3
            const skip = resultPerPage * (currentPage-1)

            const data = await productModel.find({}).skip(skip).limit(resultPerPage)
          resp.json({ msg: data, success: true });

        }
     
      
        catch (error) {
          resp.json({ msg: error.message });
        }
      };
} 
export default  ProductController