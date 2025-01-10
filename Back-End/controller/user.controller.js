import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { sendMail } from "../services/emailService.js"; // Import sendMail from emailService.js
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
// Secret key for JWT (store this in an environment variable)
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

// Define the email template
const emailTemplate = (firstName, verificationLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            color: #333;
            font-size: 24px;
            margin: 0;
        }
        .body {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin-top: 20px;
        }
        .verify-button {
            background-color: #4CAF50;
            color: white;
            padding: 14px 32px;
            font-size: 16px;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
        }
        .footer {
            font-size: 12px;
            text-align: center;
            color: #888;
            margin-top: 30px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="body">
            <p>Hello ${firstName},</p>
            <p>Thank you for signing up with us! To complete your registration and verify your email address, please click the button below:</p>
        </div>
        <div class="button-container">
            <a href="${verificationLink}" class="verify-button">Verify Your Email</a>
        </div>
        <div class="footer">
            <p>If you didn’t request this, please ignore this email.</p>
            <p>For any assistance, feel free to contact our support team.</p>
            <p>Best regards,</p>
            <p>Elysian Feast</p>
        </div>
    </div>
</body>
</html>
`;

const emailtemplatereset = (resetLink) =>`
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F5F0E6;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2F5233;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #5A6E48;
            font-size: 16px;
            line-height: 1.6;
        }
        .content a {
            color: #D16A48;
            text-decoration: none;
            font-weight: bold;
        }
        .content a:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            padding: 12px 20px;
            background-color: #D6A75C;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 16px;
        }
        .button:hover {
            background-color: #2F5233;
        }
        .footer {
            background-color: #F5F0E6;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #7C6145;
            border-top: 1px solid #e5e5e5;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hi,</p>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you didn’t request this, you can ignore this email. Your password won’t be changed.</p>
            <p>Thanks,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;

// Nodemailer setup for sending password reset emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// Function to validate email using a third-party service
const validateEmail = async (email) => {
  try {
    const response = await axios.get(`https://api.emailable.com/v1/verify`, {
      params: {
        email: email, // The email to validate
        api_key: "live_5ef86d770f848680b2e2", // Your unique API key
      },
    });

    // Handle the response based on the status of the email
    if (response.data.state === "deliverable") {
      //("Valid email address:", email);
      return true;
    } else {
      //("Invalid email address:", response.data.reason || "Unknown reason");
      return false;
    }
  } catch (error) {
    console.error("Error verifying email:", error.response?.data || error.message);
    return false; // Assume invalid if an error occurs
  }
};



// Signup
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, dateOfBirth } = req.body;

    // Validate the email
    const isEmailValid = await validateEmail(email);
    if (!isEmailValid) {
      return res.status(400).json({ message: "The provided email is invalid or does not exist. Please enter a valid email." });
    }

    const userByEmail = await User.findOne({ email });
    const userByPhone = await User.findOne({ phoneNumber });

    if (userByEmail || userByPhone) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it in the database
    const hashPassword = await bcryptjs.hash(password, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationTokenExpiresAt = Date.now() + 3600000; // Token valid for 1 hour
    //("Token expiration time:", verificationTokenExpiresAt);
    //("Token expires at:", new Date(verificationTokenExpiresAt).toLocaleString());

    const createdUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
      dateOfBirth,
      verificationToken,
      verificationTokenExpiresAt,
      isVerified: false, // Default to not verified
    });

    await createdUser.save();

    // Generate a verification link
    const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;
    const htmlContent = emailTemplate(firstName, verificationLink);

    // Send the verification email
    await sendMail(
      email,
      "Email Verification",
      // ` Welcome to our platform! Please verify your email by clicking on the link below:\n\n${verificationLink}`,
      htmlContent
      
    );

    res.status(201).json({
      message: "User created successfully. Please verify your email to activate your account.",
    });
  } catch (error) {
    //("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// verify the email
export const verifyEmail = async (req, res) => {
  //("reached")
  try {
    const { token } = req.params; // Use `params` to access the token

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    //("Current time:", Date.now());
    //("Token expires at:", user ? user.verificationTokenExpiresAt : "User not found");

    if (!user) {
      return res.status(400).json({ message: "Verification failed. Token invalid or expired." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error during email verification:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Login
export const login = async (req, res) => { 
  try {
    const { identifier, password } = req.body; // 'identifier' can be either email or phone number

    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email to log in." });
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      //i have to add expiry for security reasons
      // {expiresin : "1h"}
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (error) {
    //("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get User Count
export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments(); // Count all users in the database
    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    //("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User Details (protected)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    //("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    //("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete User (protected)
export const deleteUser = async (req, res) => {
  try {
    //("Received delete request for user ID:", req.params.id);
    //("Token from header:", req.header("Authorization")); // Log the token

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    //("Error in deleteUser controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Request Password Reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token and expiration time
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpiresAt = Date.now() + 3600000; // Token expires in 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetExpiresAt;
    await user.save();

    // Create the password reset link
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    // Send the reset token to the user's email using the sendMail function
    const resetmail = emailtemplatereset(resetLink)
    await sendMail(user.email,
       "Password Reset Request", 
      resetmail);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    //("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpiresAt = undefined; // Clear the expiration
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    //("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
