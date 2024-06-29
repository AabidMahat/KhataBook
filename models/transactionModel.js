const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: ["charge", "payment"],
      required: [true, "Transaction type is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    pendingAmount: {
      type: Number,
      required: [true, "Pending amount is required"],
      min: [0, "Pending amount cannot be negative"],
    },

    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Account ID is required"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
