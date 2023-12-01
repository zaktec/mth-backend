const {
  insertStudent,
  getStudentById,
  selectStudents,
  deleteStudentById,
  updateStudentById,
} = require('./studentModel');

exports.getStudentDashboard = (req, res, next) => {
  res.status(200).send({ message: `Welcome to the Student Dashboard, ${req.student_id}` });
};

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
    const student_id = req?.student?.student_id || req?.params.student_id;
    const data = await getStudentById(student_id);

    if (!data)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data
      });
    
    return res.status(200).json({
      status: 200,
      message: 'Success',
      data
    });
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
    const data = await insertStudent(student);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.deleteStudentById = async (req, res, next) => {
  try {
    const student_id = req?.student?.student_id || req?.params.student_id;
    const data = await deleteStudentById(student_id);
    if (data) {
      res.sendStatus(204);
    } else {
      res.status(400).send({ message: 'Invalid Input' });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.updateStudentById = async (req, res, next) => {
  try {
    const student_id = req?.student?.student_id || req?.params.student_id;
    const data = await updateStudentById(req.body, student_id);
    if (data) {
      res.status(200).send({ data });
    } else {
      res.status(400).send({ message: 'Invalid Input' });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
