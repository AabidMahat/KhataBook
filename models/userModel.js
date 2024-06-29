const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide class name"],
    unique: true, // Ensure the class name is unique
    validate: {
      validator: async function (value) {
        const count = await this.model("Class").countDocuments({
          class_name: value,
        });
        return count === 0;
      },
      message: "Class name already exists",
    },
  },
  email: {
    type: String,
    required: [true, "Please provide class email"],
    unique: true, // Ensure the class email is unique
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide class password"],
    minLength: [8, "Password must be at least 8 characters long"],
  },

  account_id: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Account",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
