const {
  selectCourses,
  selectCourseById,
  insertCourse,
  deleteCourseById,
  updateCourseById,
} = require("./course.models.js");
const { checkCourseExists } = require("../../utils/utils.js");

/**
 * app.get("/api/courses", getCourses);
 */

exports.getCourses = (req, res, next) => {
  const { sort_by } = req.query;
  selectCourses(sort_by)
    .then((courses) => {
      res.status(200).send({ courses });
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * app.get("/api/courses/:course_id", getCourseById);
 */

exports.getCourseById = (req, res, next) => {
  const { course_id } = req.params;

  return checkCourseExists(course_id)
    .then((courseExist) => {
      if (courseExist) {
        return selectCourseById(course_id).then((course) => {
          res.status(200).send({ course });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * PATCH /api/articles/:article_id
 */

exports.postCourse = (req, res, next) => {
  const course = req.body;
  insertCourse(course)
    .then((course) => {
      res.status(201).send({ course });
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * PATCH /api/articles/:article_id
 */

exports.removeCourseById = (req, res, next) => {
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

/**
 * PATCH /api/articles/:article_id
 */

exports.patchCourseById = (req, res, next) => {
  const course = req.body;
  const { course_id } = req.params;
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
