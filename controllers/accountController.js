const mongoose = require("mongoose");
const Account = require("../models/accountModel");
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const Transaction = require("../models/transactionModel");
const Staff = require("../models/staffModel");

const generateAccountId = async () => {
  // Fetch all accounts
  const accounts = await Account.find();

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Define the prefix
  const prefix = "Mktb";

  // Calculate the number of digits needed
  const totalAccounts = accounts.length + 1;
  const digits = Math.max(totalAccounts.toString().length, 5); // Minimum 5 digits
  const nextIndex = totalAccounts.toString().padStart(digits, "0");

  // Return the formatted account ID
  return `${prefix}-${currentYear}-${nextIndex}`;
};

exports.createNewAccount = async (req, res, next) => {
  try {
    const { account_name, account_type, isActive, user_id } = req.body;
    console.log(account_name, isActive);

    // Check if the account already exists
    const existingAccount = await Account.findOne({ account_name });

    if (existingAccount) {
      // Account already exists, log in the account
      return res.status(200).json({
        status: "Success",
        message: "Account already exists, logged in successfully",
        data: {
          account: existingAccount,
        },
      });
    }
    const accountId = await generateAccountId();
    // Account doesn't exist, create a new account
    const newAccount = await Account.create({
      accountId: accountId,
      account_name,
      account_type,
      isActive,
      user_id,
    });

    const user = await User.findById(user_id);

    user.account_id.push(newAccount._id); // Push the new account ID to the user's account_id array

    await user.save();

    if (!newAccount) {
      return res.status(404).json({
        status: "Failed",
        message: "Not able to create Account",
      });
    }

    // Send a successful response for account creation
    res.status(201).json({
      status: "Success",
      message: "Account created successfully",
      data: {
        account: newAccount,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getAllAccount = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const accounts = await Account.find({
      user_id: userId,
    });

    if (!accounts) {
      return res.status(404).json({
        status: "Failed",
        message: "No account founded",
      });
    }

    // Send a successful response for account creation
    res.status(200).json({
      status: "Success",
      message: "Fetched All account",
      data: {
        account: accounts,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getAccountByStaffNumber = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    console.log(staffId);

    const accounts = await Account.find({
      staffId: { $in: [staffId] },
    }).populate("staffId");

    if (!accounts) {
      return res.status(404).json({
        status: "Failed",
        message: "No accounts found for this staff",
      });
    }

    // Send successful response with staff access and accounts data
    res.status(200).json({
      status: "Success",
      message: "Fetched accounts successfully",
      accounts: accounts,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};
exports.getAdminAccount = async (req, res, next) => {
  try {
    const accounts = await Account.find();

    if (!accounts) {
      return res.status(404).json({
        status: "Failed",
        message: "No account founded",
      });
    }

    // Send a successful response for account creation
    res.status(200).json({
      status: "Success",
      message: "Fetched All account",
      data: {
        account: accounts,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAccount = async (req, res, next) => {
  try {
    const { account_id } = req.params;

    const _id = account_id.split("=")[1];

    const account = await Account.findById({
      _id,
    });

    if (!account) {
      return res.status(404).json({
        status: "error",
        message: "No account founded",
      });
    }

    // Send a successful response for account creation
    res.status(200).json({
      status: "Success",
      message: "Fetched All account",
      data: {
        account: account,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    const updateAccount = await Account.findByIdAndUpdate(
      req.params.account_id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateAccount) {
      return res.status(404).json({
        status: "error",
        message: "Error while updating account",
      });
    }

    // Send a successful response for account creation
    res.status(200).json({
      status: "Success",
      message: "Account updated",
      data: {
        account: updateAccount,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    // find the student
    const students = await Student.find({ account_id: req.params.accountId });

    // Collect student IDs to find related transactions
    const studentIds = students.map((student) => student._id);

    await Account.findByIdAndDelete(req.params.accountId);

    // Delete all transactions related to those students
    await Transaction.deleteMany({ student_id: { $in: studentIds } });

    // Delete all students related to the account
    await Student.deleteMany({ accountId: req.params.accountId });

    // Delete the account
    await Account.findByIdAndDelete(req.params.accountId);

    res.status(200).json({
      status: "Success",
      message: "Data deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
