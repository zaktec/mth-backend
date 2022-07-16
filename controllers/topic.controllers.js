const {
  selectTopics,
  insertTopic,
  selectTopicById,
  deleteTopicById,
  updateTopicById,
} = require("../models/topic.models.js");


exports.getTopics = async (req, res, next) => {
  const { sort_by } = req.query;
  try {
    const topics = await selectTopics(sort_by);
    res.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
};
//app.get("/api/topics/:topic_id", getTopicById );
exports.getTopicById = (req, res, next) => {
  const { topic_id } = req.params;
  selectTopicById(topic_id)
    .then((topic) => {
      if (topic) {
        res.status(200).send({ topic });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postTopic = (req, res, next) => {
  // console.log(req.body)
  const topic = req.body;
  insertTopic(topic)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeTopicById = (req, res, next) => {
  const { topic_id } = req.params;

  deleteTopicById(topic_id)
    .then((deletedTopics) => {
      if (deletedTopics) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.patchTopicById = (req, res, next) => {
  const topic = req.body;
  const { topic_id } = req.params;
  return updateTopicById(topic, topic_id)
    .then((updatedTopic) => {
      if (updatedTopic) {
        res.status(200).send({ updatedTopic });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      // console.log(err)
      next(err);
    });
};
