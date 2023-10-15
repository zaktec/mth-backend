const express = require("express");
const apiRouter = require("./routers/auth-routers/api.routers");
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
const {
  createNewAdmin,
  loginAdmin,
  logoutAdmin,
  createNewTutor,
  loginTutor,
  createNewStudent,
  loginStudent,
} = require("./auth/auth.controllers");
const {
  verifyStudent,
  verifyAdmin,
  verifyTutor,
} = require("./middlewares/verifyauth");
const dotenv = require("dotenv");
dotenv.config();
const { body, validationResult } = require("express-validator");
const studentdbRouter = require("./routers/unauth-routers/studentdb.router");
const tutordbRouter = require("./routers/unauth-routers/tutordb.router");

app.use(express.json());
app.use(cors());

//http://localhost:3009/api/homepage

app.get("/homepage", getHomepage);
app.get("/", getHomepage);

//admin authrisation
app.post(
  "/adminsignin",
  body("admin_username").isString(),
  handleInputErrors,
  createNewAdmin
);
app.post(
  "/adminlogin",
  body("username").isString(),
  handleInputErrors,
  loginAdmin
);
app.delete(
  "/adminlogout",
  verifyAdmin,
  logoutAdmin
);

//tutor authrisation
app.post(
  "/tutorsignin",
  body("tutor_username").isString(),
  handleInputErrors,
  createNewTutor
);
app.post(
  "/tutorlogin",
  body("username").isString(),
  handleInputErrors,
  loginTutor
);

//student authrisation
app.post(
  "/studentsignin",
  body("student_username").isString(),
  handleInputErrors,
  createNewStudent
);
app.post(
  "/studentlogin",
  body("username").isString(),
  handleInputErrors,
  loginStudent
);

//authroised user allowed on these route
//app.use(validateStudent)
app.use("/api", verifyAdmin, apiRouter);
app.use("/student", verifyStudent, studentdbRouter);
app.use("/tutor", verifyTutor, tutordbRouter);

// Error Handlers
app.all("*", handle404s);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
