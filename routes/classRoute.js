const express = require("express");
const classController = require("../controllers/classController");

const router = express.Router({ mergeParams: true });

router.route("/addClass").post(classController.createNewClass);
router.route("/getclasses/:account_no").get(classController.getClasses);

router.route("/updateClass/:classId").patch(classController.updateClass);
router.route("/deleteClass/:classId").delete(classController.deleteClass);

router.route("/fetchClasses/:classId").get(classController.fetchClass);

module.exports = router;
