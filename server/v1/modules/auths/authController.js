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
} = require('./authModel');
const { insertAdmin } = require('../admins/adminModel');
const { insertTutor } = require('../tutors/tutorModel');
const { insertStudent } = require('../students/studentModel');
const { comparePasswords } = require('../../helpers/passwordhelper');

exports.createNewAdmin = (req, res, next) => {
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

exports.loginAdmin = async (req, res, next) => {
  try {
    const { username, password, deviceId } = req.body;
    const isAdminExist = await checkAdminByUsername(username);
    if (!isAdminExist)
      return res
        .status(401)
        .json({ status: 401, message: 'username and password do not exist' });

    const isPasswordExist = await comparePasswords(
      password,
      isAdminExist.admin_password
    );

    if (!isPasswordExist)
      return res
        .status(401)
        .json({ status: 401, message: 'username and password do not exist' });

    const authAdmin = await insertAuthAdmin(isAdminExist.admin_id, deviceId);
    delete isAdminExist.admin_password;
    res.status(200).json({
      status: 200,
      message: 'Success',
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

exports.logoutAdmin = async (req, res, next) => {
  try {
    await destroyAuthAdmin(
      req.admin.admin_id,
      req.admin.admin_device_id,
      req.admin.auth_admin_token
    );
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.createNewTutor = async (req, res, next) => {
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

exports.loginTutor = async (req, res, next) => {
  try {
    const { username, password, deviceId } = req.body;
    const isTutorExist = await checkTutorByUsername(username);
    if (!isTutorExist)
      return res
        .status(401)
        .json({ status: 401, message: 'username and password do not exist' });

    const isPasswordExist = await comparePasswords(
      password,
      isTutorExist.tutor_password
    );

    if (!isPasswordExist)
      return res
        .status(401)
        .json({ status: 401, message: 'username and password do not exist' });

    const authTutor = await insertAuthTutor(isTutorExist.tutor_id, deviceId);
    delete isTutorExist.tutor_password;
    res.status(200).json({
      status: 200,
      message: 'Success',
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

exports.logoutTutor = async (req, res, next) => {
  try {
    await destroyAuthTutor(
      req.tutor.tutor_id,
      req.tutor.tutor_tutor_id,
      req.tutor.auth_tutor_token
    );
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
}

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

exports.loginStudent = async (req, res, next) => {
  try {
    const { username, password, deviceId } = req.body;
    const isStudentExist = await checkStudentByUsername(username);
    if (!isStudentExist)
      return res
        .status(401)
        .json({ status: 401, message: 'username and password do not exist' });

    const isPasswordExist = await comparePasswords(
      password,
      isStudentExist.student_password
    );

    if (!isPasswordExist)
      return res
        .status(401)
        .json({ status: 401, message: 'username and password do not exist' });

        const authStudent = await insertAuthStudent(isStudentExist.student_id, deviceId);
        delete isStudentExist.student_password;
        res.status(200).json({
          status: 200,
          message: 'Success',
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

exports.logoutStudent = async (req, res, next) => {
  try {
    await destroyAuthStudent(
      req.student.student_id,
      req.student.student_device_id,
      req.student.auth_student_token
    );
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    res.status(200).json({ status: 200, message: 'Success' });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
