/**
 * This courseController contains 5 functions required to handle
 * getCourses
 * getCourseById
 * postCourse
 * deleteCourseById
 * updateCourseById
 */

const {
    insertCourse,
    selectCourses,
    selectCourseById,
    deleteCourseById,
    updateCourseById,
    checkCourseExists,
} = require('./courseModel');


/**
 * Get list of courses
 * @param {string} req sort_by request
 * @param {object} res data response - course_code, course_desc,course_image, course_level, course_name
 * 
 */
exports.getCourses = async (req, res, next) => {
  try {
    const { sort_by } = req.query;
    const data = await selectCourses(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * serves a course object when an id is given
 * @param {int} req course_id request
 * @param {object} res data response - course_code, course_desc,course_image, course_level, course_name
 */

exports.getCourseById = async (req, res, next) => {
  try {
    const { course_id } = req.params;
    const courseExist = await checkCourseExists(course_id);
    if (courseExist) {
      const data = await selectCourseById(course_id);
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

/**
 * Register new course
 * @param {object} req body request
 * @param {object} res data response - course_code, course_desc,course_image, course_level, course_name
 */

exports.postCourse = async (req, res, next) => {
  try {
    const course = req.body;
    const data = await insertCourse(course);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Delete the Course with id given
 * @param {int} req course_id request
 * @param {object} res message response 
 * 
 */

exports.deleteCourseById = async (req, res, next) => {
  try {
    const { course_id } = req.params;
    const data = await deleteCourseById(course_id);
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
 * Update the Course with id given
 * @param {int} req course_id request
 * @param {object} res data response - course_code, course_desc,course_image, course_level, course_name
 * 
 */

exports.updateCourseById = async (req, res, next) => {
  try {
    const course = req.body;
    const { course_id } = req.params;
    const data = await updateCourseById(course, course_id);
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
