import express from "express";
import {
  signup,
  login,
  getUserCount,
  requestPasswordReset,
  resetPassword,
  updateUser,
  deleteUser,
  getAllUsers,
  verifyEmail
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/signup", signup); // Signup a user
router.get("/verify-email/:token", verifyEmail);  //verify email
router.post("/login", login);   // Login a user
router.get("/count", getUserCount); // Get total user count
router.post("/request-reset", requestPasswordReset); // Request password reset
router.post("/reset--password", resetPassword); // Reset password
router.get("/all", getAllUsers); // New route for fetching all users

// Protected Routes (authentication required)
router.put("/update/:id", verifyToken, updateUser); // Update user details
router.delete("/delete/:id", verifyToken, deleteUser); // Delete user

export default router;
