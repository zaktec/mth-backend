const express = require("express");
const topicRouter = require("./topics.routers");
const courseRouter = require("./courses.routers");
const tutorRouter = require("./tutors.routers");
const studentRouter = require("./students.routers");
const lessonRouter = require("./lessons.routers");
const quizRouter = require("./quizzes.routers");
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

apiRouter.use("/tutors", tutorRouter);

apiRouter.use("/students", studentRouter);
apiRouter.use("/lessons", lessonRouter);
apiRouter.use("/quizzes", quizRouter);




module.exports = apiRouter;
