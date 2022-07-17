const express = require ('express')
const apiRouter = require('./routers/api.routers');
const app = express();
const cors = require("cors")



const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
    handle404s 
  } = require('./errors/index');


app.use(express.json())
app.use(cors());


app.use('/api', apiRouter)


// app.get('/api/', getEndpoints)
// app.get("/api/homepage", getHomepage) 

// app.get("/api/courses", getCourses);
// app.get("/api/courses/:course_id", getCourseById); 
// app.post("/api/courses", postCourse); 
// app.delete("/api/courses/:course_id", removeCourseById);
// app.patch("/api/courses/:course_id", patchCourseById); 


// app.get("/api/topics", getTopics); 
// app.get("/api/topics/:topic_id", getTopicById );
// app.post("/api/topics", postTopic); 
// app.delete("/api/topics/:topic_id", removeTopicById); 
// app.patch("/api/topics/:topic_id", patchTopicById); 

// app.get("/api/users", getUsers)  
// app.get("/api/questions", getQuestions) 
// app.get("/api/quiz", getQuizzes) 
// app.get("/api/lessons", getLessons)


 // Error Handlers 
app.all("*", handle404s);
 app.use(handleCustomErrors);
 app.use(handlePsqlErrors);
 app.use(handleServerErrors);

module.exports =  app;
