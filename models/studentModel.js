const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  phone: {
    type: String,
    required: [true, "Please provide your valid 10 digit number"],
    validate: {
      unique: true,
      validator: function (v) {
        return validator.isMobilePhone(v, "any"); // Ensures the phone number is exactly 10 digits
      },
      message: "Please provide a valid 10 digit number",
    },
  },
  classes: {
    type: String,
    required: [true, "Please provide class"],
  },

  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  address: {
    type: String,
    default: "",
  },
  total_fees: {
    type: Number,
    required: true,
  },
  paid_fees: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    default: "default.jpg",
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
