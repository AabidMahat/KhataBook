const Student = require("../models/studentModel");
const AppError = require("../utils/appError");

exports.getStudent = async (req, res, next) => {
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
};

exports.updateMe = async (req, res, next) => {
  console.log(req.body);
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
};

exports.createStudent = async (req, res, next) => {
  const student = await Student.create(req.body);

  if (!student) {
    return res.status(404).json({
      status: "error",
      message: "Error while creating student",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Student Created",
    data: student,
  });
};

exports.getSingleStudent = async (req, res, next) => {
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
    console.log(err);
  }
};
