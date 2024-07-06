const Teacher = require("./../models/teacherModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  try {
    const { account_no } = req.params;
    const account_id = account_no.split("=")[1];
    // console.log(account_id);
    const teachers = await Teacher.find({
      account_no: account_id,
    }).select("+teacher_name");

    if (!teachers) {
      return res.status(404).json({
        status: "error",
        message: "No teacher to this account",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User founded",
      length: teachers.length,
      data: teachers,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

exports.getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    //Patient.findOne({_id:req.params.id})

    if (!teacher) {
      return next(new AppError("No teacher found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        teacher,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createTeacher = catchAsync(async (req, res, next) => {
  try {
    const { teacher_name, account_no } = req.body;

    // Use the Mongoose create method to create a new student
    const teacher = await Teacher.create({
      teacher_name,
      account_no,
    });
    console.log(teacher);

    res.status(201).json({
      status: "success",
      data: {
        teacher,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

exports.updateTeacher = catchAsync(async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.teacherId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!teacher) {
      return res.status(404).json({
        status: "error",
        message: "Error while Updating",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        teacher,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

exports.deleteTeacher = catchAsync(async (req, res, next) => {
  try {
    await Teacher.findByIdAndDelete(req.params.teacherId);

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
});
