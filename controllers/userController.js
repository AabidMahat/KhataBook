const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createNewUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    if (!newUser) {
      return res.status(404).json({
        status: "error",
        message: "User not created",
      });
    }

    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone, password });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Invalid email or Password",
      });
    }

    user.isActive = true;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.logOut = async (rwq, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.isActive = false;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );

    if (!updateUser) {
      return res.status(404).json({
        status: "fail",
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Updated the transaction",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
