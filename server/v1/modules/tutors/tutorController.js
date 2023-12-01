const {
  insertTutor,
  selectTutors,
  selectTutorById,
  deleteTutorById,
  updateTutorById,
  checkTutorExists,
  getTutorStudents,
  getTutorStudentQuiz,
  postTutorStudentQuiz,
  getTutorStudentQuizzes,
} = require('./tutorModel.js');
const { getStudentById } = require('../students/studentModel.js');

exports.getTutorDashboard = (req, res, next) => {
  res.status(200).send({ message: `Welcome to the Student Dashboard, ${req.tutor_id}` });
};

exports.getTutors = async (req, res, next) => {
  try {
    const { sort_by } = req.query;

    const data = await selectTutors(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.getTutorById = async (req, res, next) => {
  try {
    const tutor_id = req?.tutor?.tutor_id || req?.params.tutor_id;
    const tutorExist = await checkTutorExists(tutor_id);
    if (tutorExist) {
      const data = await selectTutorById(tutor_id);
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

exports.postTutor = async (req, res, next) => {
  try {
    const tutor = req.body;
    const data = await insertTutor(tutor);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.deleteTutorById = async (req, res, next) => {
  try {
    const tutor_id = req?.tutor?.tutor_id || req?.params.tutor_id;
    const data = await deleteTutorById(tutor_id);
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

exports.updateTutorById = async (req, res, next) => {
  try {
    const tutor_id = req?.tutor?.tutor_id || req?.params.tutor_id;
    const data = await updateTutorById(req.body, tutor_id);
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

exports.getTutorStudents = async (req, res) => {
  try {
    const data = await getTutorStudents(req?.tutor?.tutor_id);
     
    if (data.length === 0)
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
    return res.status(500).json({ status: 500, error: error.toString() });
  }
};

exports.postTutorStudentQuiz = async (req, res) => {
  try {
    let data = await getStudentById(req?.params.student_id);
    if (!data === 0)
      return res.status(404).json({
        status: 404,
        message: 'Student not found'
      });

    data = await getTutorStudentQuiz(req?.params.student_id, req?.params.quiz_id);
    if (data)
      return res.status(409).json({
        status: 409 ,
        message: 'Student quiz already assigned'
      });
  
    data = await postTutorStudentQuiz(req.body, req?.tutor?.tutor_id, req?.params.student_id, req?.params.quiz_id);
    return res.status(200).json({
      status: 200,
      message: 'Success',
      data
    });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.toString() });
  }
};

exports.getTutorStudentQuizzes = async (req, res, next) => {
  try {
    const student_id = req?.student?.student_id || req?.params.student_id;
    const data = await getTutorStudentQuizzes(student_id);
    if (data.length === 0)
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
