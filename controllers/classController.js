const Class = require("../models/classModel");
const Student = require("../models/studentModel");

exports.createNewClass = async (req, res, next) => {
  try {
    const {
      class_name,
      teacher_name,
      account_no,
      amount_by_time,
      duration,
      teacherId,
      class_ammount,
    } = req.body;
    const class1 = await Class.create({
      class_name,
      class_ammount,
      amount_by_time,
      duration,
      teacher_name,
      account_no,
      teacherId,
    });

    if (!class1) {
      res.status(404).json({
        status: "Error",
        message: "Not able to create class",
      });
    }

    res.status(200).json({
      status: "success",
      data: class1,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err.message,
    });
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    // Find the class by ID
    const getClass = await Class.findById(req.params.classId);
    if (!getClass) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }

    // Update the class with new data
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.classId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedClass) {
      return res.status(404).json({
        status: "error",
        message: "Error while updating class",
      });
    }

    // Update all students who are in the class being updated
    await Student.updateMany(
      { classes: getClass.class_name },
      { classes: req.body.class_name }
    );

    return res.status(200).json({
      status: "success",
      message: "Data Updated Successfully",
      data: updatedClass,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    await Class.findByIdAndDelete(req.params.classId);
    res.status(204).json({
      status: "delete successfully",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getClasses = async (req, res, next) => {
  try {
    const { account_no } = req.params;
    const account_id = account_no.split("=")[1];
    // console.log(account_id);
    const classes = await Class.find({
      account_no: account_id,
    });

    if (!classes) {
      console.log("Hello");
      res.status(404).json({
        status: "error",
        message: "No user to this account",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User founded",
      length: classes.length,
      data: classes,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.fetchClass = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: classData,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
