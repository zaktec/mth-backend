const express = require("express");
const topicRouter = require("./topics.routers");
const courseRouter = require("./courses.routers");
const tutorRouter = require("./tutors.routers");
const studentRouter = require("./students.routers");
const lessonRouter = require("./lessons.routers");
const quizRouter = require("./quizzes.routers");
const settingRouter = require("./settings.routers");
const questionRouter = require("./questions.routers");
const adminRouter = require("./admin.routers");


const {
   getadmindashboard,
} = require("../modules/dashboardadmin/admindb.controllers");


const apiRouter = express.Router();

// everything starts with api

//GET /api sends back endpoint


apiRouter.get("/admindashboard", getadmindashboard);

apiRouter.use("/topics", topicRouter);
apiRouter.use("/admin", adminRouter)

apiRouter.use("/courses", courseRouter);

apiRouter.use("/tutors", tutorRouter);

apiRouter.use("/students", studentRouter);
apiRouter.use("/lessons", lessonRouter);
apiRouter.use("/quizzes", quizRouter);
apiRouter.use("/settings", settingRouter);
apiRouter.use("/questions", questionRouter);

module.exports = apiRouter;
