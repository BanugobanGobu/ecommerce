import express from "express";
import upload from "../middlewares/uploadMiddleware"
import { createProduct } from "../controllers/ProductController";

const router = express.Router();

router.post("/post/api", upload.array("images", 10), createProduct);


export default router;