import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  address: {
    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
  },
  profilePicture: {
    type: String, // URL or path to the profile picture
    required: false,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'], // Different roles for user management
    default: 'user',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiresAt: {
    type: Date,
  },
  // New fields for email verification
  isVerified: {
    type: Boolean,
    default: false, // Default is not verified
  },
  verificationToken: {
    type: String, // Token for email verification
  },
  verificationTokenExpiresAt: {
    type: Date, // Expiration date for the token
  },
});

const User = mongoose.model("User", userSchema);
export default User;
