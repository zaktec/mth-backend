/**
 * This courseController contains 5 functions required to handle
 * getStudentDashboard 
 * getStudents 
 * getStudentById 
 * postStudent 
 * deleteStudentById
 * updateStudentById
 */


const {
  insertStudent,
  getStudentById,
  selectStudents,
  deleteStudentById,
  updateStudentById,
} = require('./studentModel');

/**
 * serves a message for admin dashboard
 * @param {*} req 
 * @param {object} res json
 * @returns 
 */

exports.getStudentDashboard = (req, res, next) => {
  res.status(200).send({ message: `Welcome to the Student Dashboard, ${req.student_id}` });
};

/**
 * Get list of student users
 * @param {string} req sort_by request
 * @param {object} res data response - student_username, student_firstname, student_lastname, student_email, student_active, student_image, student_password, student_grade, student_targetgrade, student_notes, student_progressbar, student_message_count, student_message_input, student_message_output, student_course_fk_id, student_tutor_fk_id
 * 
 */
exports.getStudents = async (req, res, next) => {
  try {
    const { sort_by } = req.query;
    const data = await selectStudents(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * serves a student object when an id is given
 * @param {int} req admin_id request
 * @param {object} res data response -student_username, student_firstname, student_lastname, student_email, student_active, student_image, student_password, student_grade, student_targetgrade, student_notes, student_progressbar, student_message_count, student_message_input, student_message_output, student_course_fk_id, student_tutor_fk_id
 */
exports.getStudentById = async (req, res, next) => {
  try {
    const student_id = req?.student?.student_id || req?.params?.student_id;
    const data = await getStudentById(student_id);

    if (!data)
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
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Register the Student user
 * @param {object} req request body 
 * @param {object} res - student response, student_username, student_firstname, student_lastname, student_email, student_active, student_image, student_password, student_grade, student_targetgrade, student_notes, student_progressbar, student_message_count, student_message_input, student_message_output, student_course_fk_id, student_tutor_fk_id
 * @returns 
 */

exports.postStudent = async (req, res, next) => {
  try {
    const student = req.body;
    const data = await insertStudent(student);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Delete the student with id given
 * @param {int} req admin_id request
 * @param {object} res message response 
 * 
 */

exports.deleteStudentById = async (req, res, next) => {
  try {
    const student_id = req?.student?.student_id || req?.params?.student_id;
    const data = await deleteStudentById(student_id);
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
 * Update the studnet User with id given
 * @param {int} req admin_id request
 * @param {object} res admin response - admin_username admin_firstname,  admin_lastname, admin_email, admin_active, admin_image, admin_password
 * 
 */

exports.updateStudentById = async (req, res, next) => {
  try {
    const student_id = req?.student?.student_id || req?.params?.student_id;
    const data = await updateStudentById(req.body, student_id);
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
