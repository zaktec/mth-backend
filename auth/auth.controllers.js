const { comparePasswords } = require("../utils/passwordhelper");
const { insertAdmin } = require("../modules/adminpage/admin.model");
const { insertTutor } = require("../modules/tutorpage/tutor.models");
const { insertStudent } = require("../modules/studentpage/student.models");
const { generateStudentJWT, generateTutorJWT } = require("../utils/jwtHelper");
const { checkStudentByUsername, checkAdminByUsername, checkTutorByUsername, insertAuthAdmin, destroyAuthAdmin } = require("./auth.models");

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
    res.status(200).json({
      status: 200,
      message: "Success",
      id: isAdminExist.admin_id,
      deviceId: authAdmin.admin_device_id,
      token: authAdmin.auth_admin_token,
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
    await destroyAuthAdmin(req.admin.admin_id, req.admin.admin_device_id, req.admin.auth_admin_token);
    res.status(200).json({ status: 200, message: "Success" });
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
    const { username, password } = req.body;
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

    const token = await generateTutorJWT(isTutorExist.tutor_id);
    res.status(200).json({ status: 200, message: "Success", id: isTutorExist.tutor_id, token });
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

exports.loginStudent = async (req, res, next) => {
  try {
    const { username, password } = req.body;
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

    const token = await generateStudentJWT(isStudentExist.student_id);
    res.status(200).json({ status: 200, message: "Success", id: isStudentExist.student_id, token });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
