import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // Represents discount percentage
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },

  images: [
    {
      type: String, 
      required: false,// Array of additional image URLs
    },
  ],
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0, // Average rating
  },
  offers: [
    {
      type: String, // Array of offer descriptions
    },
  ],
  highlights: [
    {
      type: String, // Array of product highlights
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { 
    
    type: Date,
    default: Date.now,
  },

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
