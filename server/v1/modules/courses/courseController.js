const {
    insertCourse,
    selectCourses,
    selectCourseById,
    deleteCourseById,
    updateCourseById,
    checkCourseExists,
} = require('./courseModel');

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
