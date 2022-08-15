const express = require("express");
const {
  getQuestions,
  getQuestionById,
  postQuestion,
  removeQuestionById,
  patchQuestionById
} = require("../controllers/question.controllers.js");
const questionRouter = express.Router();

// everything starts with /api/articles

questionRouter.get("/", getQuestions);
questionRouter.get("/:ques_id", getQuestionById);
questionRouter.post("/", postQuestion);
questionRouter.delete("/:ques_id", removeQuestionById);
questionRouter.patch("/:ques_id", patchQuestionById);


module.exports = questionRouter;
