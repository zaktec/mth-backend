const {
  selectQuizzes,
  selectQuizById,
  insertQuiz,
  deleteQuizById,
  updateQuizById,
} = require("./quiz.models.js");

const { checkQuizExists } = require("../../utils/utils.js");

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
      res.status(400).send({ msg: "Invalid Input" });
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

exports.removeQuizById = async (req, res, next) => {
  try {
    const { quiz_id } = req.params;

    const data = await deleteQuizById(quiz_id);
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

exports.patchQuizById = async (req, res, next) => {
  try {
    const quiz = req.body;
    const { quiz_id } = req.params;
    const data = await updateQuizById(quiz, quiz_id);
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
