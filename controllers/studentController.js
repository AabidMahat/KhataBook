const Student = require("../models/studentModel");
const Transaction = require("../models/transactionModel");
const Class = require("../models/classModel");
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

    // Find the class information
    const studentClass = await Class.findOne({
      class_name: req.body.classes,
    });

    console.log(studentClass);

    // Update student information
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        student_name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        imagePath: req.body.imagePath,
        classes: req.body.classes,
      },
      {
        runValidators: false,
        new: true,
      }
    );

    // Find transactions for the student
    const transactions = await Transaction.find({ student_id: studentId });

    const firstTransaction = transactions[0];
    const newAmount = studentClass.class_ammount;

    // Update the first transaction with the new class amount
    await Transaction.findByIdAndUpdate(
      firstTransaction._id,
      { amount: newAmount, pendingAmount: newAmount },
      { new: true }
    );

    let total_fees;
    let paid_fees = 0;

    if (transactions.length === 1) {
      // If there's only one transaction, directly set the total_fees to the new amount
      total_fees = newAmount;
    } else {
      // If there are multiple transactions, calculate the fee difference
      const feeDifference = newAmount - firstTransaction.amount;
      total_fees = firstTransaction.amount + feeDifference;
      paid_fees = transactions.reduce(
        (acc, trans) => acc + (trans.paidAmount || 0),
        0
      );
    }
    // Update student fees
    const newStudentData = await Student.findByIdAndUpdate(
      studentId,
      {
        total_fees,
        paid_fees: Math.max(paid_fees, 0), // Ensure paid_fees is not negative
      },
      {
        new: true,
        runValidators: false,
      }
    );
    if (!updatedStudent) {
      res.status(404).json({
        status: "error",
        message: "Error while modifying the data",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Data Modified",
        data: newStudentData,
      });
    }
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
