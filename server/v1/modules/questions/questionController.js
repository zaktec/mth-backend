/**
 * This questionController contains 10 functions required to handle
 * getQuestions 
 * getQuestionById
 * postQuestion
 * deleteQuestionById
 * updateQuestionById
 * getQuizQuestion
 */
const {
  getStudentQuiz,
  insertQuestion,
  selectQuestions,
  getQuizQuestions,
  viewQuizQuestions,
  selectQuestionById,
  deleteQuestionById,
  updateQuestionById,
  checkQuestionExists,
} = require('./questionModel');
const { selectQuizById } = require('../quizzes/quizModel')

/**
 * Get list of questions
 * @param {string} req sort_by request
 * @param {object} res data response - admin_username admin_firstname,  admin_lastname, admin_email, admin_active, admin_image, admin_password
 * 
 */
exports.getQuestions = async (req, res, next) => {
  try {
    const { sort_by } = req.query;
    const data = await selectQuestions(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * serves an question object when an id is given
 * @param {int} req admin_id request
 * @param {object} res data response -question_image, question_body, question_answer1, question_answer2, question_answer3, question_answer4, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination, question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback, question_quiz_fk_id
 */
exports.getQuestionById = async (req, res, next) => {
  try {
    const { question_id } = req.params;

    const questionExist = await checkQuestionExists(question_id);
    if (questionExist) {
      const data = await selectQuestionById(question_id);
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
 * Register new Admin User
 * @param {object} req body request
 * @param {object} res admin response - question_image, question_body, question_answer1, question_answer2, question_answer3, question_answer4, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination, question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback, question_quiz_fk_id
 * @returns {object} response.
 */
exports.postQuestion = async (req, res, next) => {
  try {
    const question = req.body;
    const data = await insertQuestion(question);
    res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Delete the Admin with id given
 * @param {int} req admin_id request
 * @param {object} res message response 
 * 
 */
exports.deleteQuestionById = async (req, res, next) => {
  try {
    const { question_id } = req.params;

    const data = await deleteQuestionById(question_id);
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

/**
 * Update the Admin User with id given
 * @param {int} req admin_id request
 * @param {object} res admin response - question_image, question_body, question_answer1, question_answer2, question_answer3, question_answer4, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination, question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback, question_quiz_fk_id
 * 
 */
exports.updateQuestionById = async (req, res, next) => {
  try {
    const question = req.body;
    const { question_id } = req.params;
    const data = await updateQuestionById(question, question_id);
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getQuizQuestions = async (req, res) => {
  try {
    const student_id = req?.student?.student_id || req?.params?.student_id;
    const studentQuiz = await getStudentQuiz(student_id, req?.params?.studentquiz_id);
    if (!studentQuiz)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data: studentQuiz
      });
      
    const quizDetails = await selectQuizById(studentQuiz?.studentquiz_quiz_fk_id);
    if (quizDetails.length === 0)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data: quizDetails
      });
      
    const quizQuestions = await getQuizQuestions(studentQuiz?.studentquiz_quiz_fk_id);
    if (quizQuestions.length === 0)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data: quizQuestions
      });

    const studentQuizResult = studentQuiz?.studentquiz_result !== null ? JSON.parse(studentQuiz?.studentquiz_result) : [];
    const joinedQuizQuestionResult = quizQuestions.map(obj1 => {
      const obj2 = studentQuizResult.find(obj2 => obj2.question_id === obj1.question_id);
      return { ...obj1, ...obj2 };
    });

    return res.status(200).json({
      status: 200,
      message: 'Success',
      data: {
        quizCorrection: studentQuiz?.studentquiz_percent,
        quizTutorFeedback: studentQuiz.studentquiz_tutor_feedback,
        quizStudentFeedback: studentQuiz.studentquiz_student_feedback,
        quizTutorToggle: studentQuiz.studentquiz_tutor_feedback_toggle,
        quizStudentToggle: studentQuiz.studentquiz_student_feedback_toggle,
        quizDetails: quizDetails,
        quizResults: joinedQuizQuestionResult,
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.viewQuizQuestions = async (req, res) => {
  try {
    const student_id = req?.student?.student_id || req?.params?.student_id;
    const studentQuiz = await getStudentQuiz(student_id, req?.params?.studentquiz_id);
    if (!studentQuiz)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data: studentQuiz
      });
      
    const quiz = await selectQuizById(studentQuiz?.studentquiz_quiz_fk_id);
    if (quiz.length === 0)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data: quiz
      });
      
    const questions = await viewQuizQuestions(studentQuiz?.studentquiz_quiz_fk_id);
    if (questions.length === 0)
      return res.status(404).json({
        status: 404,
        message: 'Not found',
        data: quizQuestions
      });

    return res.status(200).json({
      status: 200,
      message: 'Success',
      data: {
        quiz,
        questions
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
