/**
 * This quizController contains 10 functions required to handle
 * createNewAdmin
 * loginAdmin
 * logoutAdmin
 * createNewTutor
 * loginTutor
 * logoutTutor
 * createNewStudent
 * loginStudent
 * logoutStudent
 * verifyToken
 */

const {
  insertAuthAdmin,
  destroyAuthAdmin,
  insertAuthTutor,
  destroyAuthTutor,
  insertAuthStudent,
  destroyAuthStudent,
  checkTutorByUsername,
  checkAdminByUsername,
  checkStudentByUsername,
} = require("./authModel");
const { insertAdmin } = require("../admins/adminModel");
const { insertTutor } = require("../tutors/tutorModel");
const { insertStudent } = require("../students/studentModel");
const { comparePasswords } = require("../../helpers/passwordhelper");


/**
 * Register the Admin User
 * @param {object} req body request
 * @param {object} res admin response - admin_username admin_firstname,  admin_lastname, admin_email, admin_active, admin_image, admin_password
 * @returns {object} response.
 */
exports.createNewAdmin = (req, res) => {
  try {
    const admin = req.body;
    insertAdmin(admin).then((admin) => {
      res.status(201).send({ admin });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Admin login
 * @param {object} req body request
 * @param {object} res json response message, deviceId, token user- admin_username admin_firstname, admin_lastname, admin_email, admin_active, admin_image, admin_password
 * @returns {object} response.
 */
exports.loginAdmin = async (req, res, next) => {
  try {
    const { username, password, deviceId } = req.body;
    const isAdminExist = await checkAdminByUsername(username);
    if (!isAdminExist)
      return res
        .status(401)
        .json({ status: 401, message: "username and password do not exist" });

    const isPasswordExist = await comparePasswords(
      password,
      isAdminExist.admin_password
    );

    if (!isPasswordExist)
      return res
        .status(401)
        .json({ status: 401, message: "username and password do not exist" });

    const authAdmin = await insertAuthAdmin(isAdminExist.admin_id, deviceId);
    delete isAdminExist.admin_password;
    res.status(200).json({
      status: 200,
      message: "Success",
      deviceId: authAdmin.admin_device_id,
      token: authAdmin.auth_admin_token,
      user: isAdminExist,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Admin logout
 * @param {object} req admin request
 * @param {object} res message response
 */

exports.logoutAdmin = async (req, res) => {
  try {
    await destroyAuthAdmin(
      req.admin.admin_id,
      req.admin.admin_device_id,
      req.admin.auth_admin_token
    );
    res.status(200).json({ status: 200, message: "Success" });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
/**
 * Register the Tutor user
 * @param {object} req request body 
 * @param {object} res - tutor response, tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password
 * @returns 
 */
exports.createNewTutor = async (req, res) => {
  try {
    const tutor = req.body;
    insertTutor(tutor).then((tutor) => {
      res.status(201).send({ tutor });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Tutor login
 * @param {object} req body request
 * @param {object} res json response message, deviceId, token user- tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password
 * @returns {object} response.
 */

exports.loginTutor = async (req, res) => {
  try {
    
    const { username, password, deviceId } = req.body;
   
    const isTutorExist = await checkTutorByUsername(username);
    if (!isTutorExist)
      return res
        .status(401)
        .json({ status: 401, message: "username and password do not exist" });

    const isPasswordExist = await comparePasswords(
      password,
      isTutorExist.tutor_password
    );

    if (!isPasswordExist)
      return res
        .status(401)
        .json({ status: 401, message: "username and password do not exist" });

    const authTutor = await insertAuthTutor(isTutorExist.tutor_id, deviceId);
    delete isTutorExist.tutor_password;
    res.status(200).json({
      status: 200,
      message: "Success",
      deviceId: authTutor.tutor_device_id,
      token: authTutor.auth_tutor_token,
      user: isTutorExist,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
/**
 * Tutor logout
 * @param {object} req admin request
 * @param {object} res message response
 */
exports.logoutTutor = async (req, res, next) => {
  try {
    await destroyAuthTutor(
      req.tutor.tutor_id,
      req.tutor.tutor_tutor_id,
      req.tutor.auth_tutor_token
    );
    res.status(200).json({ status: 200, message: "Success" });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};


exports.createNewStudent = async (req, res, next) => {
  try {
    const student = req.body;
   
    insertStudent(student).then((student) => {
      res.status(201).send({ student });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Student login
 * @param {object} req body request
 * @param {object} res json response message, deviceId, token user- student response, student_username, student_firstname, student_lastname, student_email, student_active, student_image, student_password, student_grade, student_targetgrade, student_notes, student_progressbar, student_message_count, student_message_input, student_message_output, student_course_fk_id, student_tutor_fk_id
 * @returns {object} response.
 */


exports.loginStudent = async (req, res, next) => {
  try {
    const { username, password, deviceId } = req.body;
    const isStudentExist = await checkStudentByUsername(username);
    if (!isStudentExist)
      return res
        .status(401)
        .json({ status: 401, message: "username and password do not exist" });

    const isPasswordExist = await comparePasswords(
      password,
      isStudentExist.student_password
    );

    if (!isPasswordExist)
      return res
        .status(401)
        .json({ status: 401, message: "username and password do not exist" });

    const authStudent = await insertAuthStudent(
      isStudentExist.student_id,
      deviceId
    );
    delete isStudentExist.student_password;
    res.status(200).json({
      status: 200,
      message: "Success",
      deviceId: authStudent.student_device_id,
      token: authStudent.auth_student_token,
      user: isStudentExist,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Student logout
 * @param {object} req admin request
 * @param {object} res message response
 */

exports.logoutStudent = async (req, res, next) => {
  try {
    await destroyAuthStudent(
      req.student.student_id,
      req.student.student_device_id,
      req.student.auth_student_token
    );
    res.status(200).json({ status: 200, message: "Success" });
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


exports.verifyToken = async (req, res) => {
  try {
    res.status(200).json({ status: 200, message: "Success" });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
