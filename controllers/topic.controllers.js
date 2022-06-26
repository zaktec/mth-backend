const { selectTopics } = require("../models/topic.models.js");

exports.getTopics = (req, res, next) => {
  const { sort_by } = req.query;
  selectTopics(sort_by)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
  // console.log(err)
};

exports.getTopicById = () => {};

exports.postTopic = () => {};

exports.removeTopicById = () => {};

exports.patchTopicById = () => {};
