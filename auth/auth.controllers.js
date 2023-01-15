const { checkStudentByUsername, insertNewStudent } = require("./auth.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const { JWT_SECRET } = require("../.dotenv").config();
const {  comparePasswords } = require("../utils/passwordhelper")

// module.exports.yourFunction = async (req, res) => {
//   try {
//    res.status(201).json({ 
//    status: 200, 
//    message: 'Your message',
//    data: []
//    });
//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       message: ' something goes wrong ' });
//   }
// };


const createJWT = (student) => {
  const token = jwt.sign(
    {
      student_id: student.student_id,
      username: student.student_username,
      iat: Date.now(),
    },
    process.env.JWT_SECRET
  );
  return token;
};


exports.loginUser= async (req, res, next) => {
  try {
    const { username, password } = req.body;
   const isStudentExist = await checkStudentByUsername(username);
   //console.log(isStudentExist)
   if (!isStudentExist){ 
   res.status(401).json({ 
   status: 401, 
   message: 'username and password do not exist',
   });
  } 
  //console.log("djdjdhdhj")
  //console.log(isStudentExist)
  
   const isPasswordExist =  comparePasswords(password, student.student_password);
   //console.log(isPasswordExist)
   if (!isPasswordExist){ 
    res.status(401).json({ 
    status: 401, 
    message: 'username and password do not exist',
    });
   } 
   const token = createJWT(student);
   res.send({ token, msg: "Logged in" });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: ' something goes wrong ' });
  }
};

// exports.loginUser = (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     //console.log(username, password);
//     checkUser(username, password)
//       .then((student) => {
//         console.log("ping", student);
//         if (!student ) 
//           res.send({ status: 401, msg: "invalid username or password" });
        
//         const isPasswordExist = password.comparePasswords(password, student.student_password)
       
//         // return Promise.all([student,
//        //   bcrypt.compare(password, student.student_password),
//       //  ]);
//       })
//       .then(([student, passwordIsValid]) => {
//         if (!student || !passwordIsValid) {

//           next({ status: 401, msg: "invalid username or password" });
//         } else {
//           const token = createJWT(student);
//           res.send({ token, msg: "Logged in" });
//         }
//       });
//   } catch (err) {
//     next({ status: 401, msg: "halt intruder! get outta here" });
//   }
// };

exports.validateStudent = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      //   console.log(err, payload);
      if (err) {
        next({ status: 401, msg: "halt intruder! get outta here" });
      } else {
        req.student = payload;
        //null { student_id: 1, username: 'stundentusername1', iat: 1672860018550 }
        //const {student_id } =req.student
        next();
      }
    });
  } catch (err) {
    next({ status: 401, msg: "halt intruder! get outta here" });
  }
};

exports.createNewStudent = (req, res, next) => {
  const student = req.body;
  console.log(student);
  insertNewStudent(student)
    .then((student) => {
      res.status(201).send({ student });
    })
    .catch((err) => {
      next(err);
    });
};
