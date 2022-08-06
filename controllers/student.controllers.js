const {
  selectStudents,
  selectStudentById,
  insertStudent,
  deleteStudentById,
  updateStudentById,
} = require("../models/student.models.js");
const { checkStudentExists } = require("../utils/utils.js");

exports.getStudents = async (req, res, next) => {
  const { sort_by } = req.query;
  try {
    const students = await selectStudents(sort_by);
    res.status(200).send({ students });
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = (req, res, next) => {
  const { student_id } = req.params;
  console.log(student_id);

  return checkStudentExists(student_id)
    .then((studentExist) => {
      if (studentExist) {
        return selectStudentById(student_id).then((student) => {
          console.log(student);
          res.status(200).send({ student });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postStudent = (req, res, next) => {
  const student = req.body;
  console.log(student)
  insertStudent(student)
    .then((student) => {
      
      res.status(201).send({ student });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeStudentById = (req, res, next) => {
  const { student_id } = req.params;

  deleteStudentById(student_id)
    .then((deletedStudent) => {
      if (deletedStudent) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchStudentById = (req, res, next) => {
  const student = req.body;
  const { student_id } = req.params;
   
  return updateStudentById(student, student_id)
    .then((updatedStudent) => {
      if (updatedStudent) {
        res.status(200).send({ updatedStudent });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      // console.log(err)
      next(err);
    });
};
