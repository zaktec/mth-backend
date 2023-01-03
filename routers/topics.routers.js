const express = require("express");
const {
  getTopics,
  postTopic,
  getTopicById,
  removeTopicById,
  patchTopicById,
} = require("../modules/topicpage/topic.controllers.js");
const topicRouter = express.Router();

// everything starts with /api/topics/

topicRouter.get("/", getTopics);

topicRouter.get("/", getTopics);
topicRouter.get("/:topic_id", getTopicById);
topicRouter.post("/", postTopic);
topicRouter.delete("/:topic_id", removeTopicById);
topicRouter.patch("/:topic_id", patchTopicById);

module.exports = topicRouter;
