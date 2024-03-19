/**
* This quizController contains 7 functions required to handle
* getQuizzes function.
* getQuizById function.
* postQuiz function.
* deleteQuizById function.
*/
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
  postStudentQuizResult,
  updateStudentQuizResult,
  getStudentQuizByStudentQuizId,
  selectStudentQuizByStudentQuizId,
} = require('./quizModel');
const { getStudentById } = require('../students/studentModel.js');

/**
 * Handle getQuizzes.
 * @param {} req request.
 * @param {object} res data response, quiz_id, quiz_desc, etc...
 * @returns {object} response.
 */
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

/**
 * serves a quiz  object when an id is given
 * @param {int} req quiz_id request
 * @param {object} res data response -quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc, quiz_course_fk_id, quiz_topic_fk_id, quiz_lesson_fk_id
 */
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

/**
 * Handle postQuiz.
 * @param {object} req request, quiz_name, quiz_dec, quiz_mark.
 * @param {object} res data response, quiz_id, quiz_desc, etc...
 * @returns {object} response.
 */
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

/**
 * save student quiz result
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.postStudentQuizResult = async (req, res) => {
  try {
    const questionResutls = [];
    const student_id = req?.student?.student_id || req?.params?.student_id;
    let data = await getStudentQuizByStudentQuizId(student_id, req?.params?.studentquiz_id);
    if (data.length === 0)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data
      });

    req.body.data.forEach((element) => {
      questionResutls.push({
        question_id: element.question_id,
        question_help: element.question_help,
        question_choice_class: element.question_choice_class,
        question_choice_answer: element.question_choice_answer,
        question_choice_answer_correct: element.question_choice_answer_correct
      })
    });

    const quizResult = {
      studentQuiz_status: 'completed',
      studentQuiz_percent: req.body.correction,
      studentQuiz_result: JSON.stringify(questionResutls),
    }

    data = await postStudentQuizResult(student_id, req?.params?.studentquiz_id, quizResult);
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

exports.updateStudentQuizResult = async (req, res) => {
  try {
    let data = await selectStudentQuizByStudentQuizId(req?.params?.studentquiz_id);
    if (data.length === 0)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data
      });

    data = await updateStudentQuizResult(req?.params?.studentquiz_id, req?.body);
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
