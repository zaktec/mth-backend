const express = require ('express')
const app = express();
const fs = require('fs')
const  { getHomepage } = require("./controllers/homepage.controllers.js")
const  { getCourses} = require("./controllers/course.controllers.js")
const  { getTopics} = require("./controllers/topic.controllers.js")
const  { getUsers} = require("./controllers/user.controllers.js")
const  { getQuestions} = require("./controllers/question.controllers.js")
const  { getQuizzes} = require("./controllers/quiz.controllers.js");
const { getLessons} = require('./controllers/lesson.controllers.js');
const { getDigitutors} = require('./controllers/digitutor.controllers.js');
const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
    handle404s 
  } = require('./errors/index');


app.use(express.json())

app.get("/api/homepage", getHomepage) 
app.get("/api/courses", getCourses) 
app.get("/api/topics", getTopics) 
app.get("/api/users", getUsers)  
app.get("/api/questions", getQuestions) 
app.get("/api/quiz", getQuizzes) 
app.get("/api/lessons", getLessons)


app.get("/api/digitutors", getDigitutors); 

// Error Handlers 
app.all("*", handle404s);

 app.use(handleCustomErrors);
 app.use(handlePsqlErrors);
 app.use(handleServerErrors);

app.all( '/*', (req, res) =>{
    res.status(404).send({ msg:" Route not found  "});

});

app.use((err, req, res, next) => {
    if (err.status){
        res.status(err.status).send({ msg: err.msg});
    } else{
        next(err)
    }
})


app.use((err, req, res, next ) => {
    console.log(err);
    res.sendStatus(500).send ({msg: 'internal server error'});
});

module.exports =  app  ;
