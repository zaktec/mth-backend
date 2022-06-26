const express = require('express');
const { getTopics } = require('../controllers/topics.controllers');
const topicRouter = express.Router();

// everything starts with /api/topics/ 

topicRouter.get('/', getTopics)

module.exports = topicRouter;