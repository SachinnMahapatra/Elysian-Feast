import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderCount,
} from "../controller/order.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Order routes
router.post("/create", verifyToken, createOrder); // Create an order
router.get("/all", verifyToken, getAllOrders); // Get all orders
router.get("/count", verifyToken, getOrderCount); // Count all orderss


//Dynamic Routes
router.get("/:id", verifyToken, getOrderById); // Get order by ID
router.put("/:id/status", verifyToken, updateOrderStatus); // Update order status
router.delete("/:id", verifyToken, deleteOrder); // Delete an order

export default router;
