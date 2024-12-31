const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true, 
    min: [0, "Amount cannot be negative"] 
  },
  type: { 
    type: String, 
    enum: ["Credit", "Debit"], 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Completed", "Failed"], 
    default: "Pending" 
  },
  description: { 
    type: String, 
    maxlength: [200, "Description cannot exceed 200 characters"] 
  },
  transactionId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  reference: { 
    type: String, 
    default: null 
  },
  metadata: {
    ipAddress: { 
      type: String 
    },
    device: { 
      type: String 
    },
  },
});

// Middleware to generate unique transaction ID before saving
transactionSchema.pre("save", async function (next) {
  if (!this.transactionId) {
    this.transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model("Transaction", transactionSchema);
