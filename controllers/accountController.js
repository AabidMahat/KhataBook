const mongoose = require("mongoose");
const Account = require("../models/accountModel");
const User = require("../models/userModel");

exports.createNewAccount = async (req, res, next) => {
  try {
    const { account_name, isActive, user_id } = req.body;
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

    // Account doesn't exist, create a new account
    const newAccount = await Account.create({
      account_name,
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
};
exports.getAdminAccount = async (req, res, next) => {
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
};

exports.getAccount = async (req, res, next) => {
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
};

exports.updateAccount = async (req, res, next) => {
  const { account_id } = req.params;

  const updateAccount = await Account.findByIdAndUpdate(account_id, req.body, {
    new: true,
  });
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
};
