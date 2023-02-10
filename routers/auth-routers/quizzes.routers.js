const express = require("express");
const {
  getQuizzes,
  getQuizById,
  postQuiz,
  removeQuizById,
  patchQuizById,
} = require("../../modules/quizpage/quiz.controllers.js");
const quizRouter = express.Router();

// everything starts with /api/articles

quizRouter.get("/", getQuizzes);
quizRouter.get("/:quiz_id", getQuizById);
quizRouter.post("/", postQuiz);
quizRouter.delete("/:quiz_id", removeQuizById);
quizRouter.patch("/:quiz_id", patchQuizById);

module.exports = quizRouter;
