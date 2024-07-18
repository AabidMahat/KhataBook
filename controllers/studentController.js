const Student = require("../models/studentModel");
const Transaction = require("../models/transactionModel");
const AppError = require("../utils/appError");

exports.getStudent = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const account_id = accountId.split("=")[1];
    console.log(account_id);
    const students = await Student.find({
      account_id,
    });

    if (!students) {
      console.log("Hello");
      res.status(404).json({
        status: "error",
        message: "No user to this account",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User founded",
      length: students.length,
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    //@ update the user
    const { studentId } = req.params;
    const updateData = await Student.findByIdAndUpdate(
      studentId,
      {
        student_name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        imagePath: req.body.imagePath,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updateData) {
      res.status(404).json({
        status: "error",
        message: "Error while modifing the data",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data Modified",
      data: updateData,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const deleteData = await Student.findByIdAndDelete(studentId);

    await Transaction.deleteMany({
      student_id: studentId,
    });

    if (!deleteData) {
      return res.status(404).json({
        status: "error",
        message: "Error while deleting the data",
      });
    }
    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Error while creating student",
      });
    }

    if (student.total_fees > 0) {
      await Transaction.create({
        student_id: student._id,
        amount: student.total_fees,
        transactionType: "charge",
        pendingAmount: student.total_fees,
        account_id: req.body.account_id,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Student Created",
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getSingleStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const _id = studentId.split("=")[1];

    const student = await Student.find({
      _id: _id,
    });

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Error while Finding student",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Data Found",
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateAmount = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const id = studentId.split("=")[1];

    const updateData = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateData);
    if (!updateData) {
      return res.status(404).json({
        status: "fail",
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Updated the transaction",
      data: updateData,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
