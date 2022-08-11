const {  selectQuizzes,
        selectQuizById,
        insertQuiz,
        deleteQuizById,
        updateQuizById


} =require('../models/quiz.models.js')

const { checkQuizExists } = require("../utils/utils.js");

exports.getQuizzes = (req, res, next) => {
    
  const { sort_by } = req.query;
  selectQuizzes(sort_by)
    .then((quizzes) => {
      res.status(200).send({ quizzes });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getQuizById = (req, res, next) => {
  const { quiz_id } = req.params;

  return checkQuizExists(quiz_id)
    .then((quizExist) => {
      if (quizExist) {
        return selectQuizById(quiz_id).then((quiz) => {
          res.status(200).send({ quiz });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });

};

exports.postQuiz = (req, res, next) => {
  const quiz = req.body;
  insertQuiz(quiz)
    .then((quiz) => {
      res.status(201).send({ quiz });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeQuizById = (req, res, next) => {
  const { quiz_id } = req.params;

  deleteQuizById(quiz_id)
    .then((deletedQuiz) => {
      if (deletedQuiz) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchQuizById = (req, res, next) => {
  const quiz = req.body;
  const { quiz_id } = req.params;
  // console.log(course_id, course)
  return updateQuizById(quiz, quiz_id)
    .then((updatedQuiz) => {
      if (updatedQuiz) {
        res.status(200).send({ updatedQuiz });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      // console.log(err)
      next(err);
    });

};