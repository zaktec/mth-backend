const {
  selectTopics,
  insertTopic,
  selectTopicById,
  deleteTopicById
} = require("../models/topic.models.js");

//app.get("/api/topics", getTopics);
exports.getTopics = (req, res, next) => {
  const { sort_by } = req.query;
  selectTopics(sort_by)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
  // console.log(err)
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
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  // console.log(req.body)
  const topic = req.body;
  insertTopic(topic)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};

exports.removeTopicById = (req, res, next) => {
  const { topic_id } = req.params;
  console.log(topic_id)

  deleteTopicById(topic_id)
    .then((deletedTopics) => {
      console.log(deletedTopics)
      if (deletedTopics) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: 'Not found' });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchTopicById = () => {};
