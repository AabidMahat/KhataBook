const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router({ mergeParams: true });

router.route("/createUser").post(userController.createNewUser);
router.route("/login").post(userController.loginUser);

router.route("/logOut/:userId").post(userController.logOut);

router.route("/getUser/:userId").get(userController.getUser);

router.route("/updateUser/:userId").patch(userController.updateUser);

router.route("/forgetPassword").post(userController.forgetPassword);

router.route("/resetPassword").patch(userController.resetPassword);

router.route("/allUsers").get(userController.getAllUsers);

module.exports = router;
