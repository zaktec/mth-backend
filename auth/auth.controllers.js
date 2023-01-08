const { checkUser, insertNewStudent } = require("./auth.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const { JWT_SECRET } = require("../.dotenv").config();

exports.comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};
exports.hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

const createJWT = (student) => {
  const token = jwt.sign(
    {
      student_id: student.student_id,
      username: student.student_username,
      iat: Date.now(),
    },
    process.env.JWT_SECRET
  );
  return token
  }

exports.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  //console.log(username, password);
  checkUser(username, password)
  .then((student) => {
   console.log(student);
  return Promise.all([student, bcrypt.compare(password, student.student_password)]);
  })
  .then (([ student, passwordIsValid])=>{
    if (!student || !passwordIsValid) {
   // if (!student || !student.student_password) {
      next({ status: 401, msg: "invalid username or password" });
    } else {
      const token = createJWT(student)
      // const token = jwt.sign(
      //   {
      //     student_id: student.student_id,
      //     username: student.student_username,
      //     iat: Date.now(),
      //   },
      //   process.env.JWT_SECRET
      // );
      res.send({ token,  msg: "Logged in"  });
      //res.send({ msg: "Logged in" });
    }
  });
};

exports.validateStudent = (req, res, next) => {
  try{
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
   //   console.log(err, payload);
      if (err) {
        next({ status: 401, msg: "halt intruder! get outta here" });
      } else {
        req.student = payload
        //null { student_id: 1, username: 'stundentusername1', iat: 1672860018550 }
        //const {student_id } =req.student
        next();
      }
    });
  } catch(err){
    next({ status: 401, msg: "halt intruder! get outta here" });
  }
 
};

exports.createNewStudent = (req, res, next) => {
  const student = req.body;
console.log(student)
  insertNewStudent(student)
    .then((student) => {
      res.status(201).send({ student });
    })
    .catch((err) => {
      next(err);
    });
};