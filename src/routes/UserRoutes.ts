import express from "express";
import userController from "../controllers/UserControllers";
const router=express.Router()



router.post("/register/api",userController.register);
router.post("/login/api",userController.login)



export default router;