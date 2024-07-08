const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  account_name: {
    type: "String",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },

  // staff_number: {
  //   type: "String",
  // },
  // staff_access: {
  //   type: String,
  //   default: "",
  // },
  staffId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Staff",
  },

  isActive: Boolean,

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
