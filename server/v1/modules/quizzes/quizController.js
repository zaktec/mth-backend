const {
  insertQuiz,
  selectQuizzes,
  selectQuizById,
  deleteQuizById,
  updateQuizById,
  checkQuizExists,
  getStudentQuiz,
  postStudentQuiz,
  getStudentQuizzes,
} = require('./quizModel');
const { getStudentById } = require('../students/studentModel.js');

exports.getQuizzes = async (req, res, next) => {
  try {
    const { sort_by } = req.query;
    const data = await selectQuizzes(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.getQuizById = async (req, res, next) => {
  try {
    const { quiz_id } = req.params;
    const quizExist = await checkQuizExists(quiz_id);
    if (quizExist) {
      const data = await selectQuizById(quiz_id);
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

exports.postQuiz = async (req, res, next) => {
  try {
    const quiz = req.body;
    const data = await insertQuiz(quiz);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.deleteQuizById = async (req, res, next) => {
  try {
    const { quiz_id } = req.params;

    const data = await deleteQuizById(quiz_id);
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

exports.updateQuizById = async (req, res, next) => {
  try {
    const quiz = req.body;
    const { quiz_id } = req.params;
    const data = await updateQuizById(quiz, quiz_id);
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

exports.postStudentQuiz = async (req, res) => {
  try {
    let data = await getStudentById(req?.params?.student_id);
    if (!data === 0)
      return res.status(404).json({
        status: 404,
        message: 'Student not found'
      });

    data = await getStudentQuiz(req?.params?.student_id, req?.params?.quiz_id);
    if (data)
      return res.status(409).json({
        status: 409 ,
        message: 'Student quiz already assigned'
      });
  
    data = await postStudentQuiz(req.body, req?.tutor?.tutor_id, req?.params?.student_id, req?.params?.quiz_id);
    return res.status(200).json({
      status: 200,
      message: 'Success',
      data
    });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.toString() });
  }
};

exports.getStudentQuizzes = async (req, res) => {
  try {
    const student_id = req?.student?.student_id || req?.params?.student_id;
    const data = await getStudentQuizzes(student_id);
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
