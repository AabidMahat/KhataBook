const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router({ mergeParams: true });
router.route("/createAdmin").post(adminController.createNewAdmin);

router.route("/login").post(adminController.loginAdmin);

// router.route("/logOut/:userId").post(userController.logOut);

router.route("/getAdmin").get(adminController.getAdmin);

router.route("/updateAdmin/:userId").patch(adminController.updateAdmin);

router
  .route("/getUserByOrganization/:accountId")
  .get(adminController.userBasedOnOrganization);

module.exports = router;
