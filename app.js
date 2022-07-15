const express = require ('express')
const app = express();
const fs = require('fs')
const  { getHomepage, getEndpoints } = require("./controllers/homepage.controllers.js")
const  { getCourses, getCourseById, postCourse, removeCourseById, patchCourseById } = require("./controllers/course.controllers.js")
const  { getTopics, postTopic,  getTopicById, removeTopicById } = require("./controllers/topic.controllers.js")
const  { getUsers} = require("./controllers/user.controllers.js")
const  { getQuestions} = require("./controllers/question.controllers.js")
const  { getQuizzes} = require("./controllers/quiz.controllers.js");
const { getLessons} = require('./controllers/lesson.controllers.js');

const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
    handle404s 
  } = require('./errors/index');


app.use(express.json())

app.get('/api/', getEndpoints)
app.get("/api/homepage", getHomepage) 

app.get("/api/courses", getCourses);
app.get("/api/courses/:course_id", getCourseById); 
app.post("/api/courses", postCourse); 
app.delete("/api/courses/:course_id", removeCourseById);
app.patch("/api/courses/:course_id", patchCourseById); 


app.get("/api/topics", getTopics); 
app.get("/api/topics/:topic_id", getTopicById );
app.post("/api/topics", postTopic); 
app.delete("/api/topics/:topic_id", removeTopicById); 


app.get("/api/users", getUsers)  

app.get("/api/questions", getQuestions) 

app.get("/api/quiz", getQuizzes) 

app.get("/api/lessons", getLessons)


 // Error Handlers 
app.all("*", handle404s);
 app.use(handleCustomErrors);
 app.use(handlePsqlErrors);
 app.use(handleServerErrors);

module.exports =  app;
