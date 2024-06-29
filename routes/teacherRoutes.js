const express = require("express");

const teacherController = require("./../controllers/teacherController");

const router = express.Router({ mergeParams: true });

router.route("/addTeacher").post(teacherController.createTeacher);
router.route("/getTeacher/:account_no").get(teacherController.getAllTeachers);

module.exports = router;
