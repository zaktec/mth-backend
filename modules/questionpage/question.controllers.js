const {
  selectQuestions,
  selectQuestionById,
  insertQuestion,
  deleteQuestionById,
  updateQuestionById,
} = require("./question.models.js");

const { checkQuestionExists } = require("../../utils/utils.js");

exports.getQuestions = async (req, res, next) => {
  try {
  const { sort_by } = req.query;
  const data = await selectQuestions(sort_by)
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
  console.log(question_id)

  const questionExist = await checkQuestionExists(question_id)
      if (questionExist) {
        const data = await selectQuestionById(question_id)
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
exports.postQuestion = async (req, res, next) => {
  try {
  const question = req.body;
  const data = await insertQuestion(question)
      res.status(201).send({ data });
  } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  };

exports.removeQuestionById = async (req, res, next) => {
  try {
  const { ques_id } = req.params;

  const data = await deleteQuestionById(ques_id)
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

exports.patchQuestionById =  async (req, res, next) => {
  try {
  const question = req.body;
  const { ques_id } = req.params;
  const data =  await updateQuestionById(question, ques_id)
      if (data) {
        res.status(200).send({ data });
      } else {
        res.status(400).send({ msg: "Invalid Input" });  
      }
    }
    catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  };
