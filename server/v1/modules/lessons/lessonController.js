const {
  insertLesson,
  selectLessons,
  selectLessonById,
  deleteLessonById,
  updateLessonById,
  checkLessonExists,
} = require('./lessonModel');

exports.getLessons = async (req, res, next) => {
  try {
    const { sort_by } = req.query;
    const data = await selectLessons(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.getLessonById = async (req, res, next) => {
  try {
    const { lesson_id } = req.params;

    const lessonExist = await checkLessonExists(lesson_id);
    if (lessonExist) {
      const data = await selectLessonById(lesson_id);
      res.status(200).send({ data });
    } else {
      res.status(400).send({ message: 'Invalid Input' });
      //return Promise.reject({ status: 404, message: 'Not found' });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.postLesson = async (req, res, next) => {
  try {
    const lesson = req.body;
    const data = await insertLesson(lesson);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.deleteLessonById = async (req, res, next) => {
  try {
    const { lesson_id } = req.params;
    const data = await deleteLessonById(lesson_id);
    if (data) {
      res.sendStatus(204);
    } else {
      res.status(400).send({ message: 'Invalid Input' });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.updateLessonById = async (req, res, next) => {
  try {
    const lesson = req.body;
    const { lesson_id } = req.params;
    const data = await updateLessonById(lesson, lesson_id);
    if (data) {
      res.status(200).send({ data });
    } else {
      res.status(400).send({ message: 'Invalid Input' });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
