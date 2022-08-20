const {  selectQuestions,
        selectQuestionById,
        insertQuestion,
        deleteQuestionById,
        updateQuestionById
      } =require('../models/question.models.js')

const { checkQuestionExists } = require("../utils/utils.js");

exports.getQuestions = ( req, res, next) => {

  const { sort_by } = req.query;

  selectQuestions(sort_by)
    .then((questions) => {
      res.status(200).send({ questions });
    })
    .catch((err) => {
      next(err);
    });
};


exports.getQuestionById = (req, res, next) => {
  const { ques_id } = req.params;
  

  return checkQuestionExists(ques_id)
    .then((questionExist) => {
      if (questionExist) {
        return selectQuestionById(ques_id).then((question) => {
          console.log(question)
          res.status(200).send({ question });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });

};

exports.postQuestion = (req, res, next) => {
  const question = req.body;
  insertQuestion(question)
    .then((question) => {
      res.status(201).send({ question });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeQuestionById = (req, res, next) => {
  const { ques_id } = req.params;

  deleteQuestionById(ques_id)
    .then((deletedQuestion) => {
      if (deletedQuestion) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};


exports.patchQuestionById = (req, res, next) => {

  const question = req.body;
  const { ques_id } = req.params;
  // console.log(course_id, course)
  return updateQuestionById(question, ques_id)
    .then((updatedQuestion) => {
      if (updatedQuestion) {
        res.status(200).send({ updatedQuestion });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      // console.log(err)
      next(err);
    });
};