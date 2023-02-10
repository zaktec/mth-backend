const express = require("express");
const {
  getStudents,
  getStudentById,
  postStudent,
  removeStudentById,
  patchStudentById,
} = require("../../modules/studentpage/student.controllers.js");
const studentRouter = express.Router();

// everything starts with /api/articles

studentRouter.get("/", getStudents);
studentRouter.get("/:student_id", getStudentById);
studentRouter.post("/", postStudent);
studentRouter.delete("/:student_id", removeStudentById);
studentRouter.patch("/:student_id", patchStudentById);

module.exports = studentRouter;
