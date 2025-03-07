const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  account_name: {
    type: "String",
  },

  accountId: {
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
  account_type: {
    type: "String",
    default: "Maktab",
  },
  staffId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Staff",
  },

  isActive: Boolean,

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paymentDate: {
    type: Date,
    default: Date.now(),
  },

  suscribtionDate: {
    type: Date,
    default: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
  },
  suscribedMonths: {
    type: String,
    default: "3 Months",
  },
  whatsapp_template: {
    type: String,
    default:
      "Assalamualaikum,\nAap se guzarish hai ke apne bache ke Maktab ki bakiya fees jald se jald ada kar dein. Shukriya!",
  },
  sms_template: {
    type: String,
    default:
      "Assalamualaikum,\nAap se guzarish hai ke apne bache ke Maktab ki bakiya fees jald se jald ada kar dein. Shukriya!",
  },
  url_template: {
    type: String,
    default: "7559153594@pthdfc",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
