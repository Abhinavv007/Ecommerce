import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import AuthController from "../controllers/authController.js"
const router = express.Router()

router.post("/register",AuthController.register)
router.post("/login",AuthController.login)
router.post("/forgot-password",AuthController.forgotPassword)
router.put("/update-user/:id",verifyToken,AuthController.updateUser)
router.get("/getUser/:id",AuthController.getUserByID)

export default router