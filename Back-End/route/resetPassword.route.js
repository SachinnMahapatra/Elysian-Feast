import express from 'express';
import User from '../model/user.model.js'; // Assuming user model is in this path
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // If you need to verify the token or use it elsewhere

const router = express.Router();

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find user by the token (you may have stored it in a database)
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
