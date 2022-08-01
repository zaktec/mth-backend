const express = require("express");
const {
  getUsers,
  // getCourseById,
  // postCourse,
  // removeCourseById,
  // patchCourseById,
} = require("../controllers/student.controllers.js");
const userRouter = express.Router();

// everything starts with /api/articles

userRouter.get("/", getUsers);
// courseRouter.get("/:course_id", getCourseById);
// courseRouter.post("/", postCourse);
// courseRouter.delete("/:course_id", removeCourseById);
// courseRouter.patch("/:course_id", patchCourseById);



module.exports = userRouter;
