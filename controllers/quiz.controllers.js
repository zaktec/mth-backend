const {  selectQuizzes,
        selectQuizById,


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
  insertCourse(course)
    .then((course) => {
      res.status(201).send({ course });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeQuizById = (req, res, next) => {
  const { course_id } = req.params;

  deleteCourseById(course_id)
    .then((deletedCourse) => {
      if (deletedCourse) {
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
  const course = req.body;
  const { course_id } = req.params;
  // console.log(course_id, course)
  return updateCourseById(course, course_id)
    .then((updatedCourse) => {
      if (updatedCourse) {
        res.status(200).send({ updatedCourse });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      // console.log(err)
      next(err);
    });

};