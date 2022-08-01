const express = require("express");
const topicRouter = require("./topics.routers");
const courseRouter = require("./courses.routers");
const userRouter = require("./users.routers")
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

apiRouter.use("/courses", courseRouter);

apiRouter.use('/users', userRouter)

module.exports = apiRouter;
