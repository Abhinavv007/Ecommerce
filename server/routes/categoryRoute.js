import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import isAdmin from "../middlewares/isAdmin.js"
import CategoryController from "../controllers/categoryController.js"
const router = express.Router()

router.get("/getAllCategories",verifyToken,CategoryController.getAllCategories)
router.get("/getSingleCategory/:id",verifyToken,CategoryController.getSingleCategory)
router.post("/create-category",verifyToken,isAdmin,CategoryController.createCategory)
router.put("/update-category/:id",verifyToken,isAdmin,CategoryController.updateCategory)
router.delete("/delete-category/:id",verifyToken,isAdmin,CategoryController.deleteCategory)


export default router