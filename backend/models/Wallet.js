const mongoose = require("mongoose");

/**
 * Wallet Schema
 * @description Represents a user's wallet, tracking their balance and associated transactions.
 */
const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensures a user has only one wallet
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance cannot be negative"], // Prevent negative balances
    },
    currency: {
      type: String,
      default: "INR", // Default currency
      enum: ["INR", "USD", "EUR"], // Restrict to supported currencies
    },
    createdAt: {
      type: Date,
      default: Date.now, // Timestamp for wallet creation
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Timestamp for the last update
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Middleware to update `updatedAt` on balance modification
walletSchema.pre("save", function (next) {
  if (this.isModified("balance")) {
    this.updatedAt = Date.now();
  }
  next();
});

/**
 * Method to add funds to the wallet.
 * @param {Number} amount - Amount to be added
 */
walletSchema.methods.addFunds = function (amount) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }
  this.balance += amount;
};

/**
 * Method to deduct funds from the wallet.
 * @param {Number} amount - Amount to be deducted
 */
walletSchema.methods.deductFunds = function (amount) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }
  if (this.balance < amount) {
    throw new Error("Insufficient balance");
  }
  this.balance -= amount;
};

module.exports = mongoose.model("Wallet", walletSchema);
