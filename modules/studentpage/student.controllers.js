const {
  selectStudents,
  selectStudentById,
  insertStudent,
  deleteStudentById,
  updateStudentById,
} = require("./student.models.js");
const { checkStudentExists } = require("../../utils/utils.js");

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

exports.getStudentById = async (req, res, next) => {
  try {
  const { student_id } = req.params;
  const studentExist = await  checkStudentExists(student_id)
      if (studentExist) {
        const data = await selectStudentById(student_id)
          res.status(200).send({ data });
      } else {
        res.status(400).send({ msg: "Invalid Input" });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  };

exports.postStudent = async (req, res, next) => {
  try {
  const student = req.body;
  const data = await insertStudent(student)
      res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
exports.removeStudentById = async (req, res, next) => {
  try {
  const { student_id } = req.params;
const data = await deleteStudentById(student_id)
      if (data) {
        res.sendStatus(204);
      } else {
        res.status(400).send({ msg: "Invalid Input" });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  };

exports.patchStudentById = async (req, res, next) => {
  try {
  const student = req.body;
  const { student_id } = req.params;

  const data = await updateStudentById(student, student_id)
      if (data) {
        res.status(200).send({ data });
      } else {
        res.status(400).send({ msg: "Invalid Input" });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  };
