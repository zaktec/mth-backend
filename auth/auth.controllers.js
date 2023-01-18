const { checkStudentByUsername, insertNewStudent } = require("./auth.models");
const {  comparePasswords } = require("../utils/passwordhelper");
const {  generateStudentJWT } = require("../utils/jwtHelper");
const jwt = require("jsonwebtoken");

exports.loginUser= async (req, res, next) => {
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

// exports.loginUser= async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//    const isStudentExist = await checkStudentByUsername(username);
//    //console.log(isStudentExist)
//    if (!isStudentExist){ 
//    res.status(401).json({ 
//    status: 401, 
//    message: 'username and password do not exist',
//    });
//   } 
//   //console.log("djdjdhdhj")
//   //console.log(isStudentExist)
  
//    const isPasswordExist =  comparePasswords(password, student.student_password);
//    //console.log(isPasswordExist)
//    if (!isPasswordExist){ 
//     res.status(401).json({ 
//     status: 401, 
//     message: 'username and password do not exist',
//     });
//    } 
//    const token = createJWT(student);
//    res.send({ token, msg: "Logged in" });

//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       error: error.toString()
//     });
//   }
// };

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
