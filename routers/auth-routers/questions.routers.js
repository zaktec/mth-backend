const express = require("express");
const {
  getQuestions,
  getQuestionById,
  postQuestion,
  removeQuestionById,
  patchQuestionById,
} = require("../../modules/questionpage/question.controllers.js");
const questionRouter = express.Router();

// everything starts with /api/articles

questionRouter.get("/", getQuestions);
questionRouter.get("/:question_id", getQuestionById);
questionRouter.post("/", postQuestion);
questionRouter.delete("/:question_id", removeQuestionById);
questionRouter.patch("/:question_id", patchQuestionById);

module.exports = questionRouter;
