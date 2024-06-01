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
  postStudentQuizShareableLink,
  getStudentQuizByStudentQuizId,
  selectStudentQuizByStudentQuizId,
} = require("./quizModel");

const { insertAuthStudent } = require("../auths/authModel.js");
const { getStudentById } = require("../students/studentModel.js");

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
      res.status(400).send({ message: "Invalid Input" });
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
      res.status(400).send({ message: "Invalid Input" });
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
      res.status(400).send({ message: "Invalid Input" });
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
        message: "Student not found",
      });

    data = await getStudentQuiz(req?.params?.student_id, req?.params?.quiz_id);
    if (data)
      return res.status(409).json({
        status: 409,
        message: "Student quiz already assigned",
      });

    data = await postStudentQuiz(
      req.body,
      req?.tutor?.tutor_id,
      req?.params?.student_id,
      req?.params?.quiz_id
    );
    return res.status(200).json({
      status: 200,
      message: "Success",
      data,
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
        message: "Not found",
        data,
      });

    return res.status(200).json({
      status: 200,
      message: "Success",
      data,
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
    const student_id = req?.student?.student_id || req?.params?.student_id;
    let data = await getStudentQuizByStudentQuizId(student_id, req?.params?.studentquiz_id);
    if (data.length === 0)
      return res.status(404).json({
        status: 404,
        message: "Not found",
        data,
      });

    const quizBody = {
      studentQuiz_status: "completed",
      studentQuiz_learner: req?.body?.studentQuiz_learner,
      studentQuiz_percent: req?.body?.studentQuiz_percent,
      studentQuiz_result: JSON.stringify(req.body?.studentQuiz_result),
    };

    data = await postStudentQuizResult(student_id,req?.params?.studentquiz_id, quizBody);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data,
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
    let data = await selectStudentQuizByStudentQuizId(
      req?.params?.studentquiz_id
    );

    if (data.length === 0)
      return res.status(404).json({
        status: 404,
        message: "Not found",
        data,
      });

    data = await updateStudentQuizResult(req?.params?.studentquiz_id, req?.body);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.postStudentQuizShareableLink = async (req, res) => {
  try {
    let data = await selectStudentQuizByStudentQuizId(
      req?.params?.studentquiz_id
    );
    const authData = await insertAuthStudent(
      data?.studentquiz_student_fk_id,
      req?.params?.studentquiz_id
    );

    if (!data)
      return res.status(404).json({
        status: 404,
        message: "Not found",
        data,
      });

    const body = {
      studentQuiz_shareable_link: req?.body?.studentQuiz_shareable_link,
      studentQuiz_verify_shareable_link: `${req?.body?.studentQuiz_verify_shareable_link}/${authData?.auth_student_token}`,
    };

    data = await postStudentQuizShareableLink(req?.params?.studentquiz_id, {
      studentQuiz_shareable_details: JSON.stringify(body),
    });
    return res.status(200).json({
      status: 200,
      message: "Success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
