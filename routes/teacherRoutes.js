const express = require("express");

const teacherController = require("./../controllers/teacherController");

const router = express.Router({ mergeParams: true });

router.route("/addTeacher").post(teacherController.createTeacher);
router.route("/getTeacher/:account_no").get(teacherController.getAllTeachers);

router
  .route("/updateTeacher/:teacherId")
  .patch(teacherController.updateTeacher);

router
  .route("/deleteTeacher/:teacherId")
  .delete(teacherController.deleteTeacher);

module.exports = router;
