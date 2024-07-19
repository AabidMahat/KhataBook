const Transaction = require("../models/transactionModel");
const Student = require("../models/studentModel");
const AppError = require("../utils/appError");

exports.getTransactionData = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const _id = studentId.split("=")[1];
    console.log(_id);

    const data = await Transaction.find({
      student_id: _id,
    }).populate("account_id", "account_name");

    if (!data) {
      res.status(404).json({
        status: "Error",
        message: "Something went wrong",
      });
    }
    res.status(202).json({
      status: "Success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllTransaction = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const _id = accountId.split("=")[1];

    const transaction = await Transaction.find({
      account_id: _id,
    }).populate("account_id", "account_name");

    console.log(transaction);
    if (!transaction) {
      return next(
        new AppError("There is no transaction in these account", 404)
      );
    }

    res.status(200).json({
      status: "Success",
      data: transaction,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      message: "Something went wrong",
      err,
    });
  }
};

exports.addAmount = async (req, res, next) => {
  try {
    const {
      student_id,
      account_id,
      pendingAmount,
      transactionType,
      transaction_description,
      transaction_mode,
      amount,
    } = req.body;

    const newTransaction = await Transaction.create({
      student_id,
      account_id,
      transactionType,
      transaction_description,
      transaction_mode,
      amount,
      pendingAmount,
    });

    if (!newTransaction) {
      res.status(404).json({
        status: "Error",
        message: "Error While performing the transaction",
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        newTransaction,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const _id = transactionId.split("=")[1];
    await Transaction.findByIdAndDelete({
      _id: _id,
    });

    res.status(200).json({
      status: "success",
      message: "Deleted the transaction",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const { amount, pendingAmount } = req.body;
    const _id = transactionId.split("=")[1];

    console.log("Hello from backend");

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      _id,
      { amount, pendingAmount },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        status: "fail",
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedTransaction,
    });

    req.trans = updatedTransaction;
    //Calculating aggregate function
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while updating the transaction",
    });
  }
};
