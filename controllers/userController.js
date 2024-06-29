const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({ name, email, password });

  if (!newUser) {
    return next(new AppError("Not able to create Account! ", 401));
  }

  res.status(200).json({
    status: "success",
    data: newUser,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "Invalid email or Password",
    });
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});
