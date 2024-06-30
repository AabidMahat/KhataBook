const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router({ mergeParams: true });

router.route("/getStudnet/:accountId").get(studentController.getStudent);

router.route("/updateme/:studentId").patch(studentController.updateMe);
router
  .route("/deleteStudent/:studentId")
  .delete(studentController.deleteStudent);

router.route("/createStudent").post(studentController.createStudent);

router
  .route("/fetchStudent/:studentId")
  .get(studentController.getSingleStudent);

router.route("/updateAmount/:studentId").patch(studentController.updateAmount);

module.exports = router;
