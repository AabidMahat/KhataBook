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

  account_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

// Add a pre-save hook to ensure class_name is unique
classSchema.pre("save", async function (next) {
  const classExists = await this.constructor.findOne({
    class_name: this.class_name,
  });
  if (classExists) {
    const error = new Error("Class name already exists");
    return next(error);
  }
  next();
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
