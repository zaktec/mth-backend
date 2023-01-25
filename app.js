const express = require("express");
const apiRouter = require("./routers/api.routers");
const {
  getHomepage,
  getEndpoints,
} = require("./modules/homepage/homepage.controllers.js");
const app = express();
const cors = require("cors");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handle404s,
  handleInputErrors,
} = require("./errors/index");
const { studentUser,  createNewStudent, loginStudent } = require("./auth/auth.controllers");
const {  validateStudent, } = require("./utils/jwtHelper");
const dotenv = require('dotenv');
dotenv.config();
const { body, validationResult } =require( "express-validator");

app.use(express.json());
app.use(cors());

//http://localhost:3009/api/homepage
app.get("/", getEndpoints);
app.get("/homepage", getHomepage);
app.post("/login", body('username').isString(),handleInputErrors, loginStudent);
app.post("/signin", body('student_username').isString(),handleInputErrors, createNewStudent );

//authroised user allowed on these route
//app.use(validateStudent)
app.use('/api/', validateStudent, apiRouter)

/* app.use(validateTutor)
app.use('/api/', apiRouter) */






// Error Handlers
app.all("*", handle404s);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
