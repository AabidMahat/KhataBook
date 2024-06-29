const express = require("express");
const classController = require("../controllers/classController");

const router = express.Router({ mergeParams: true });

router.route("/addClass").post(classController.createNewClass);
router.route("/getclasses/:account_no").get(classController.getClasses);

module.exports = router;
