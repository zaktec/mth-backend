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
const { loginAdmin,  createNewStudent, loginStudent, createNewAdmin, loginTutor,createNewTutor } = require("./auth/auth.controllers");
const {  validateStudent, validateAdmin, } = require("./utils/jwtHelper");
const dotenv = require('dotenv');
dotenv.config();
const { body, validationResult } =require( "express-validator");

app.use(express.json());
app.use(cors());

//http://localhost:3009/api/homepage
app.get("/", getEndpoints);
app.get("/homepage", getHomepage);

//student authrisation
app.post("/studentlogin", body('username').isString(),handleInputErrors, loginStudent);
app.post("/studentsignin", body('student_username').isString(),handleInputErrors, createNewStudent );


//admin authrisation
app.post("/adminlogin", body('username').isString(),handleInputErrors,  loginAdmin)
app.post("/adminsignin", body('admins_username').isString(),handleInputErrors,createNewAdmin)

//tutor authrisation
app.post("/tutorlogin", body('username').isString(),handleInputErrors,  loginTutor)
app.post("/tutorsignin", body('tutor_username').isString(),handleInputErrors,createNewTutor)


//authroised user allowed on these route
//app.use(validateStudent)
app.use('/api/', validateAdmin, apiRouter)

/* app.use(validateTutor)
app.use('/api/', apiRouter) */






// Error Handlers
app.all("*", handle404s);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
