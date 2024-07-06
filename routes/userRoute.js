const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router({ mergeParams: true });

router.route("/createUser").post(userController.createNewUser);
router.route("/login").post(userController.loginUser);

router.route("/getUser/:userId").get(userController.getUser);

module.exports = router;
