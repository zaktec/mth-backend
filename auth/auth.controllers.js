const { checkStudentByUsername, insertNewStudent } = require("./auth.models");
const {  comparePasswords } = require("../utils/passwordhelper");
const {  generateStudentJWT } = require("../utils/jwtHelper");
const jwt = require("jsonwebtoken");


exports.loginStudent= async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isStudentExist = await checkStudentByUsername(username);
    if (!isStudentExist) 
    return res.status(401).json({ status: 401, message: 'username and password do not exist' });
    
    const isPasswordExist =  await comparePasswords(password, isStudentExist.student_password);
    if (!isPasswordExist)
    return res.status(401).json({ status: 401, message: 'username and password do not exist'});

    const token = await generateStudentJWT(isStudentExist.student_id);
    res.status(200).json({ status: 200, message: 'Success', token });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString()
    });
  }
};

exports.createNewStudent = (req, res, next) => {
  const student = req.body;
  //console.log(student);
  insertNewStudent(student)
    .then((student) => {
      res.status(201).send({ student });
    })
    .catch((err) => {
      next(err);
    });
};
