const {
  insertQuestion,
  selectQuestions,
  getQuizQuestions,
  selectQuestionById,
  deleteQuestionById,
  updateQuestionById,
  checkQuestionExists,
} = require('./questionModel');

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

exports.getQuizQuestions = async (req, res) => {
  try {
    const data = await getQuizQuestions(req?.params?.studentquiz_id);
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
