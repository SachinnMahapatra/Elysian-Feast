import Product from "../model/product.model.js";
import mongoose from "mongoose";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

// Cloudinary configuration
const { v2: cloudinaryv2 } = cloudinary;

cloudinaryv2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryv2,
  params: {
    folder: "products",
    format: async (req, file) => file.mimetype.split("/")[1], // Retain original file format
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

export const upload = multer({ storage }).single("productImage");


// Create Product with Cloudinary Image URL
export const createProduct = async (req, res) => {
  try {
    
    const { 
      name, 
      price, 
      description, 
      category, 
      quantity, 
      rating, 
      originalPrice, 
      discount, 
      offers, 
      highlights, 
      imageUrl 
    } = req.body;
    // console.log(req.file); // Check the file being received
    // Ensure required fields are provided
    if (!name || !price || !description || !category || !quantity) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    // Check if product image is provided via file or URL
    let productImageUrl = imageUrl; // If imageUrl is provided in the request body
    if (req.file) {
      productImageUrl = req.file.path; // If image file is uploaded via multer
    }

    if (!productImageUrl) {
      return res.status(400).json({ success: false, message: "Product image is required" });
    }

    // Create the new product with all fields, including the image URL
    const newProduct = await Product.create({
      name,
      price,
      description,
      imageUrl: productImageUrl, // Store the image URL (Cloudinary URL or custom URL)
      category,
      quantity,
      rating: rating || 0,
      originalPrice: originalPrice || price,
      discount,
      offers: offers ? offers.split(',') : [],
      highlights: highlights ? highlights.split(',') : [],
    });

    res.status(201).json({ success: true, newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};


// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get Total Product Count
export const getProductCount = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error counting products:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Update Product by ID
export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.imageUrl = req.file.path; // Update image if provided
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Delete Product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete the product using findByIdAndDelete
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};




// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error.message); // Log the error message
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
