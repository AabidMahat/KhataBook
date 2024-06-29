const mongoose = require("mongoose");
const validator = require("validator");

const staffSchema = new mongoose.Schema({
  staff_name: {
    type: String,
    required: [true, "Please provide staff name"],
  },
  staff_number: {
    type: String,
    required: [true, "Enter the phone number"],
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "any"); // Validates mobile phone format
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  staffPassword: {
    type: String,
    required: [true, "Please provide password"],
  },
  staff_access: {
    type: String,
    enum: ["low", "medium", "high"], // Ensures staff_access is one of these values
    default: "low",
  },
  account_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
