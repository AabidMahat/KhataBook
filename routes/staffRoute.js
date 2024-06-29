const express = require("express");
const staffController = require("../controllers/staffController");

const router = express.Router({ mergeParams: true });

router.route("/addStaff/:accountId").post(staffController.createNewStaff);

router.route("/loginStaff").post(staffController.staffLogin);

router
  .route("/staffAccount/:staff_id")
  .get(staffController.getAccountBasedStaff);

module.exports = router;
