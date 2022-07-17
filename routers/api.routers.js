const express = require("express");
const topicRouter = require("./topics.routers");
const articleRouter = require("./courses.routers");
//const commentRouter =require('./comments.routers')
const {
  getHomepage,
  getEndpoints,
} = require("../controllers/homepage.controllers.js");

const apiRouter = express.Router();

// everything starts with api

//GET /api sends back endpoint
apiRouter.get("/", getEndpoints);
apiRouter.get("/homepage", getHomepage);

apiRouter.use("/topics", topicRouter);

apiRouter.use("/courses", articleRouter);

//apiRouter.use('/comments', commentRouter)

module.exports = apiRouter;
