const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, "Please provide Name"],
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [8, "Password must be at least 8 characters long"],
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
