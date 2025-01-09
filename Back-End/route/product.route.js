import express from "express";
import { 
  createProduct, 
  getAllProducts, 
  updateProduct, 
  deleteProduct, 
  getProductCount, 
  upload, 
  getProductById
} from "../controller/product.controller.js";

const router = express.Router();

// Product Routes
router.post("/create", upload, createProduct); // Create product with image upload
router.get("/all", getAllProducts); // Get all products
router.get("/count", getProductCount); // Get product count
router.get("/:id", getProductById); // Get product count
router.put("/update/:id", updateProduct); // Update product by ID
router.delete("/delete/:id", deleteProduct); // Delete product by ID

export default router;
