const express = require("express");
const topicRouter = require("./topics.routers");
const courseRouter = require("./courses.routers");
const tutorRouter = require("./tutors.routers")
const studentRouter =require("./students.routers")
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

apiRouter.use('/tutors', tutorRouter);


  apiRouter.use('/students', studentRouter);
 
console.log(studentRouter)
module.exports = apiRouter;
