import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import isAdmin from "../middlewares/isAdmin.js"
import multer from "multer"
import ProductController from "../controllers/productController.js"
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/upload`)
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })
router.post("/create-product",verifyToken,isAdmin,upload.single("photo"),ProductController.createProduct)
router.get("/get-products",ProductController.getAllProds)
router.get("/get-product/:id",ProductController.getProd)
router.put("/edit-product/:id",verifyToken,isAdmin,upload.single("photo"),ProductController.EditProduct)
router.delete("/delete-product/:id",verifyToken,isAdmin,ProductController.deleteProd)
router.get("/search",verifyToken,ProductController.search)
router.get("/filter-cat",verifyToken,ProductController.filterCat)
router.get("/pagination",verifyToken,ProductController.pagination)

export default router