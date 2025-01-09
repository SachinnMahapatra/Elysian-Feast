import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied - No token provided" });
  }

  // Split and validate token format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: "Access Denied - Invalid token format" });
  }

  const token = parts[1];

  try {
    // Verify the token
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified; // Attach the verified user info to `req.user`
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Token Verification Error:", error.message); // Debugging info

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired, please log in again" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token, access denied" });
    } else {
      return res.status(500).json({ message: "An error occurred while verifying token" });
    }
  }
};
