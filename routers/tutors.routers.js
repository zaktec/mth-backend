const express = require("express");
const {
  getTutors,
  // getCourseById,
  // postCourse,
  // removeCourseById,
  // patchCourseById,
} = require("../controllers/tutor.controllers.js");
const tutorRouter = express.Router();

// everything starts with /api/articles

tutorRouter.get("/", getTutors);
// courseRouter.get("/:course_id", getCourseById);
// courseRouter.post("/", postCourse);
// courseRouter.delete("/:course_id", removeCourseById);
// courseRouter.patch("/:course_id", patchCourseById);



module.exports = tutorRouter;
