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
    },
    pendingAmount: {
      type: Number,
      required: [true, "Pending amount is required"],
    },
    transaction_description: {
      type: String,
    },
    transaction_mode: {
      type: String,
      default: "-",
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
