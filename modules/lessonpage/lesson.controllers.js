const {
  selectLessons,
  selectLessonById,
  insertLesson,
  deleteLessonById,
  updateLessonById,
} = require("./lesson.models.js");

const { checkLessonExists } = require("../../utils/utils.js");

exports.getLessons = (req, res, next) => {
  const { sort_by } = req.query;
  selectLessons(sort_by)
    .then((lessons) => {
      console.log(lessons)
      res.status(200).send({ lessons });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getLessonById = (req, res, next) => {
  const { lesson_id } = req.params;

  return checkLessonExists(lesson_id)
    .then((lessonExist) => {
      if (lessonExist) {
        return selectLessonById(lesson_id).then((lesson) => {
          res.status(200).send({ lesson });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postLesson = (req, res, next) => {
  const lesson = req.body;
  
  insertLesson(lesson)
    .then((lesson) => {
      
      res.status(201).send({ lesson });
      
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeLessonById = (req, res, next) => {
  const { lesson_id } = req.params;

  deleteLessonById(lesson_id)
    .then((deletedLesson) => {
      if (deletedLesson) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchLessonById = (req, res, next) => {
  const lesson = req.body;
  const { lesson_id } = req.params;
  return updateLessonById(lesson, lesson_id)
    .then((updatedLesson) => {
      if (updatedLesson) {
        res.status(200).send({ updatedLesson });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      // console.log(err)
      next(err);
    });
};
