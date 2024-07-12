const mongoose = require("mongoose");
const validator = require("validator");
const otpGenerator = require("otp-generator");

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

  otp: Number,
  otpExpires: Date,
});

userSchema.methods.createOtp = async function () {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  this.otp = otp;
  this.otpExpires = Date.now() + 5 * 60 * 1000;

  console.log(this.otpExpires);
};

userSchema.methods.otpExpired = function () {
  return this.otpExpires < Date.now();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
