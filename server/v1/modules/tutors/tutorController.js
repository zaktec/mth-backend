/**
 * This topicController contains 5 functions required to handle
 * getTutorDashboard
 * getTutors
 * selectTutorById
 * postTutor 
 * deleteTutorById
 * updateTutorById 
 * getTutorStudents
 */

const {
  insertTutor,
  selectTutors,
  selectTutorById,
  deleteTutorById,
  updateTutorById,
  checkTutorExists,
  getTutorStudents,
} = require('./tutorModel.js');

/**
 * serves a message for admin dashboard
 * @param {*} req 
 * @param {object} res json
 * @returns 
 */

exports.getTutorDashboard = (req, res, next) => {
  res.status(200).send({ message: `Welcome to the Tutor Dashboard, ${req.tutor_id}` });
};

/**
 * Get list of tutors
 * @param {string} req sort_by request
 * @param {object} res data response - tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password
 * 
 */

exports.getTutors = async (req, res, next) => {
  try {
    const { sort_by } = req.query;

    const data = await selectTutors(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * serves a tutor object when an id is given
 * @param {int} req tutor_id request
 * @param {object} res data response - tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password
 */

exports.getTutorById = async (req, res, next) => {
  try {
    const tutor_id = req?.tutor?.tutor_id || req?.params?.tutor_id;
    const tutorExist = await checkTutorExists(tutor_id);
    if (tutorExist) {
      const data = await selectTutorById(tutor_id);
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
 * Register new tutor
 * @param {object} req body request
 * @param {object} res data response - tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password
 */


exports.postTutor = async (req, res, next) => {
  try {
    const tutor = req.body;
    const data = await insertTutor(tutor);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Delete the tutor with id given
 * @param {int} req course_id request
 * @param {object} res message response 
 * 
 */

exports.deleteTutorById = async (req, res, next) => {
  try {
    const tutor_id = req?.tutor?.tutor_id || req?.params?.tutor_id;
    const data = await deleteTutorById(tutor_id);
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
 * Update the tutor with id given
 * @param {int} req tutor_id request
 * @param {object} res data response - tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password
 * 
 */

exports.updateTutorById = async (req, res, next) => {
  try {
    const tutor_id = req?.tutor?.tutor_id || req?.params?.tutor_id;
    const data = await updateTutorById(req.body, tutor_id);
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

exports.getTutorStudents = async (req, res) => {
  try {
    const data = await getTutorStudents(req?.tutor?.tutor_id);
     
    if (data.length === 0)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data
      });

    return res.status(200).json({
      status: 200,
      message: 'Success',
      data
    });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.toString() });
  }
};
