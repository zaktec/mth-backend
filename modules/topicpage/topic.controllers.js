const {
  selectTopics,
  insertTopic,
  selectTopicById,
  deleteTopicById,
  updateTopicById,
} = require("./topic.models.js");
const { checkTopicExists } = require("../../utils/utils.js");

exports.getTopics = async (req, res, next) => {
  try {
  const { sort_by } = req.query;
    const topics = await selectTopics(sort_by);
    res.status(200).send({ topics });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
//app.get("/api/topics/:topic_id", getTopicById );
exports.getTopicById = async (req, res, next) => {
  try {
  const { topic_id } = req.params;

  const topicExist = await checkTopicExists(topic_id)
      if (topicExist) {
        const data = await  selectTopicById(topic_id)
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

exports.postTopic = async (req, res, next) => {
  try {
  const topic = req.body;
  const data = await insertTopic(topic)
      res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

exports.removeTopicById = async (req, res, next) => {
  try {
  const { topic_id } = req.params;

 const data =  await deleteTopicById(topic_id)
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
exports.patchTopicById = async (req, res, next) => {
  try {
  const topic = req.body;
  const { topic_id } = req.params;
const data = await updateTopicById(topic, topic_id)
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