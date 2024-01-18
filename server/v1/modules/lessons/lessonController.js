/**
 * This lessonController contains 10 functions required to handle
 * getLessons
 * getLessonById
 * postLesson 
 * deleteLessonById 
 * updateLessonById
 */

const {
  insertLesson,
  selectLessons,
  selectLessonById,
  deleteLessonById,
  updateLessonById,
  checkLessonExists,
} = require('./lessonModel');

/**
 * Get list of lessons
 * @param {string} req sort_by request
 * @param {object} res data response - lesson_topic,lesson_name, lesson_code, lesson_desc, lesson_grade, lesson_body, lesson_topic_fk_id
 * 
 */

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

/**
 * serves a lesson object when an id is given
 * @param {int} req admin_id request
 * @param {object} res data response -lesson_topic,lesson_name, lesson_code, lesson_desc, lesson_grade, lesson_body, lesson_topic_fk_id
 */

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

/**
 * Register new lesson User
 * @param {object} req body request
 * @param {object} res admin response - lesson_topic,lesson_name, lesson_code, lesson_desc, lesson_grade, lesson_body, lesson_topic_fk_id
 * 
 */

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

/**
 * Delete the lesson with id given
 * @param {int} req admin_id request
 * @param {object} res message response 
 * 
 */

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

/**
 * Update the lesson with id given
 * @param {int} req admin_id request
 * @param {object} res admin response - admin_username admin_firstname,  admin_lastname, admin_email, admin_active, admin_image, admin_password
 * 
 */

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
