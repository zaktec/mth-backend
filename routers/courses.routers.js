const express = require("express");
const {
  getCourses,
  getCourseById,
  postCourse,
  removeCourseById,
  patchCourseById,
} = require("../modules/coursepage/course.controllers.js");
const courseRouter = express.Router();

// everything starts with /api/articles

courseRouter.get("/", getCourses);
courseRouter.get("/:course_id", getCourseById);
courseRouter.post("/", postCourse);
courseRouter.delete("/:course_id", removeCourseById);
courseRouter.patch("/:course_id", patchCourseById);

// //GET /api/articles
// articleRouter.route('/')
// .get(getArticles);

// articleRouter.route('/:article_id')
// //GET /api/articles/:article_id
// .get(getArticleById)

// //PATCH /api/articles/:article_id
// .patch(patchArticleByVotes);

// articleRouter.route('/:article_id/comments')
// //GET /api/articles/:article_id/comments
// .get(getCommentsByArticleId)
// //POST /api/articles/:article_id/comments
// .post(postCommentByArticleId)

module.exports = courseRouter;
