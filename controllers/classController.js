const Class = require("../models/classModel");

exports.createNewClass = async (req, res, next) => {
  const { class_name, teacher_name, account_no } = req.body;
  const class1 = await Class.create({
    class_name,
    teacher_name,
    account_no,
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
};

exports.getClasses = async (req, res, next) => {
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
};
