const mongoose = require("mongoose");
const Admin = require("../models/adminModel");

exports.createNewAdmin = async (req, res, next) => {
  try {
    const newAdmin = await Admin.create(req.body);

    if (!newAdmin) {
      return res.status(404).json({
        status: "error",
        message: "User not created",
      });
    }

    res.status(200).json({
      status: "success",
      data: newAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const admin = await Admin.findOne({ phone, password });

    if (!admin) {
      return res.status(404).json({
        status: "error",
        message: "Invalid phone number or password",
      });
    } else {
      // Handle normal user login
      res.status(200).json({
        status: "success",
        data: {
          admin,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params);
    if (!admin) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: admin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    console.log(req.params.userId);
    const updateAdmin = await Admin.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );

    if (!updateAdmin) {
      return res.status(404).json({
        status: "fail",
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Updated the transaction",
      data: updateAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
