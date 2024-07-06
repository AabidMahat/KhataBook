const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true, // Ensure the class= email is unique
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  phone: {
    type: String,
    required: [true, "Please provide phone"],
    unique: true, // Ensure the class phone is unique
    validate: {
      validator: validator.isMobilePhone,
      message: "Please provide a valid phone number",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [8, "Password must be at least 8 characters long"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
  imagePath: {
    type: String,
    default: "default.jpg",
  },

  isActive: {
    type: Boolean,
    default: false,
  },

  account_id: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Account",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
