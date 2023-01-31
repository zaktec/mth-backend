const express = require("express");
const {
  getCourses,
  getCourseById,
  postCourse,
  removeCourseById,
  patchCourseById,
} = require("../modules/coursepage/course.controllers.js");
const courseRouter = express.Router();

// everything starts with /api/courses

courseRouter.get("/", getCourses);
courseRouter.get("/:course_id", getCourseById);
courseRouter.post("/", postCourse);
courseRouter.delete("/:course_id", removeCourseById);
courseRouter.patch("/:course_id", patchCourseById);


module.exports = courseRouter;
