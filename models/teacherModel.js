const mongoose = require("mongoose");
const validator = require("validator");

const teacherSchema = new mongoose.Schema({
  teacher_name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  account_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
