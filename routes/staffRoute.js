const express = require("express");
const staffController = require("../controllers/staffController");

const router = express.Router({ mergeParams: true });

router.route("/addStaff/:accountId").post(staffController.createNewStaff);

router.route("/loginStaff").post(staffController.staffLogin);

router
  .route("/staffAccount/:staff_id")
  .get(staffController.getAccountBasedStaff);

router.route("/getAllStaff/:accountId").get(staffController.getAllStaff);

router.route("/updateStaff/:staffId").patch(staffController.updateStaff);

router.route("/deleteStaff/:staffId").delete(staffController.deleteStaff);

router.route("/getStaff/:staffId").get(staffController.getStaff);

module.exports = router;
