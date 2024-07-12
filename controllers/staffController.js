const Account = require("../models/accountModel");
const Staff = require("../models/staffModel");

exports.createNewStaff = async (req, res, next) => {
  try {
    const { staff_name, staff_number, staff_access } = req.body;
    const { accountId } = req.params;
    let account_no = accountId.split("=")[1];

    const staffPassword = `${staff_name.split(" ")[0]}@${staff_number.slice(
      0,
      3
    )}`;
    console.log(staffPassword);

    const staff = await Staff.create({
      staff_name,
      staff_number,
      staff_access,
      staffPassword,
      account_no,
    });

    // Update Account model with staff_number

    const account = await Account.findOneAndUpdate(
      { _id: account_no }, // Adjust this query based on your actual logic
      { $push: { staffId: staff._id } },
      { new: true, runValidators: false } // Adjust options as needed
    );

    if (!staff) {
      res.status(404).json({
        status: "Error",
        message: "Not able to create staff",
      });
    }

    res.status(201).json({
      status: "success",
      data: staff,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err,
    });
  }
};

exports.staffLogin = async (req, res, next) => {
  try {
    const { staff_number } = req.body;
    const staff = await Staff.findOne({ staff_number }).populate("account_no");
    if (!staff) {
      return res.status(404).json({
        status: "Error",
        message: "Not able to create staff",
      });
    }
    res.status(201).json({
      status: "success",
      data: staff,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err,
    });
  }
};

exports.getAccountBasedStaff = async (req, res, next) => {
  try {
    const { staff_id } = req.params;
    const _id = staff_id.split("=")[1];

    const staff = await Staff.findById(_id).populate("account_no");

    if (!staff || !staff.account_no) {
      return res.status(404).json({
        status: "Error",
        message: "Staff or assigned account not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { account: staff.account_no },
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err,
    });
  }
};

exports.getAllStaff = async (req, res, next) => {
  try {
    const staff = await Staff.find({
      account_no: req.params.accountId,
    });
    if (!staff) {
      return res.status(404).json({
        status: "Error",
        message: "Staff Not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: staff,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err,
    });
  }
};
