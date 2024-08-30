const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const accountSID = process.env.TWILIO_SID;
const accountAuth = process.env.TWILIO_TOKEN;
const accountNum = process.env.TWILIO_NUMBER;

const client = require("twilio")(accountSID, accountAuth);

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

exports.logOut = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
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

exports.forgetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No User with this number",
      });
    }
    await user.createOtp();
    await user.save({ validateBeforeSave: false });

    await sendOtp(user.otp, user.phone);

    res.status(200).json({
      status: "success",
      message: "Verify the otp",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  console.log("Received OTP:", req.body.otp);
  console.log("Current Time:", Date.now());

  const user = await User.findOne({
    otp: req.body.otp,
    otpExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Otp is expired or inValid",
    });
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Password Updated Successfully",
    data: user,
  });
};

const sendOtp = async (otp, userNum) => {
  let msgOption = {
    from: accountNum,
    to: "+91" + userNum,
    body: "Your OTP is " + otp,
  };

  try {
    await client.messages.create(msgOption);
    console.log("Message sent successfully");
  } catch (err) {
    console.log("Error while sending message", err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const users = await User.find({
      user_id: userId,
    });

    if (!users) {
      res.status(404).json({
        status: "error",
        message: "No user to this account",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User founded",
      length: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);

    res.status(201).json({
      status: "success",
      message: "User Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
