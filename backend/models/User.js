const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
  },
  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: [8, "Password must be at least 8 characters long"], 
    select: false // Prevent password from being returned in queries
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  resetPasswordToken: { 
    type: String 
  },
  resetPasswordExpire: { 
    type: Date 
  },
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token and set it to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set the expiration time for the token (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
