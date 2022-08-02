const express = require("express");
const {
  getStudents,
  // getCourseById,
  // postCourse,
  // removeCourseById,
  // patchCourseById,
} = require("../controllers/student.controllers.js");
const studentRouter = express.Router();

// everything starts with /api/articles

studentRouter.get("/", getStudents);
// courseRouter.get("/:course_id", getCourseById);
// courseRouter.post("/", postCourse);
// courseRouter.delete("/:course_id", removeCourseById);
// courseRouter.patch("/:course_id", patchCourseById);



module.exports = studentRouter;
