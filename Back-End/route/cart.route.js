import express from 'express';
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from '../controller/cart.controller.js';
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post('/', verifyToken, addToCart); // Add product to cart
router.get('/:userId', verifyToken, getCart); // Get user's cart
router.put('/:productId', verifyToken, updateCart); // Update product quantity in cart
router.post("/remove", removeFromCart);
// Remove product from cart


export default router;
