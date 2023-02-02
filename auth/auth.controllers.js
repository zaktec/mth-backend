const {
  checkStudentByUsername,
  insertNewStudent,
  insertNewAdmin,
  checkAdminByUsername,
  checkTutorByUsername,
  insertNewTutor
} = require("./auth.models");
const { comparePasswords } = require("../utils/passwordhelper");
const { generateStudentJWT, generateAdminJWT, generateTutorJWT } = require("../utils/jwtHelper");
const jwt = require("jsonwebtoken");

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
    res.status(200).json({ status: 200, message: "Success", token });
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
    insertNewStudent(student).then((student) => {
      res.status(201).send({ student });
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
    const { username, password } = req.body;
    const isAdminExist = await checkAdminByUsername(username);
    if (!isAdminExist)
      return res
        .status(401)
        .json({ status: 401, message: "username and password do not exist" });

    const isPasswordExist = await comparePasswords(
      password,
      isAdminExist.admins_password
    );
    if (!isPasswordExist)
      return res
        .status(401)
        .json({ status: 401, message: "usernames and password do not exist" });

    const token = await generateAdminJWT(isAdminExist.admins_id);
    res.status(200).json({ status: 200, message: "Success", token });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.createNewAdmin = (req, res, next) => {
  try {
    const admin = req.body;
    insertNewAdmin(admin).then((admin) => {
      res.status(201).send({ admin });
    });
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
    insertNewTutor(tutor).then((tutor) => {
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
    res.status(200).json({ status: 200, message: "Success", token });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
