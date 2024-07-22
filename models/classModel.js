const mongoose = require("mongoose");
const validator = require("validator");

// Create a schema for the Class model
const classSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: [true, "Please provide class name"],
  },

  teacher_name: {
    type: String,
    required: [true, "Please provide teacher name"],
  },
  class_ammount: {
    type: Number,
  },

  amount_by_time: {
    type: Number,
  },

  duration: {
    type: Number,
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },

  account_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
