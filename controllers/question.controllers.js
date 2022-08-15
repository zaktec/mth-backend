const {  selectQuestions,
        selectQuestionById } =require('../models/question.models.js')

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
  const course = req.body;
  insertCourse(course)
    .then((course) => {
      res.status(201).send({ course });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeQuestionById = (req, res, next) => {
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


exports.patchQuestionById = (req, res, next) => {

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