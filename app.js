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
} = require("./errors/index");
const { protect } = require("./auth/auth");
const { loginUser, signin } = require("./auth/auth.controllers");

app.use(express.json());
app.use(cors());

//http://localhost:3009/api/homepage
app.get("/", getEndpoints);
app.get("/homepage", getHomepage);
app.post("/signin", signin);
//app.post("/signinuser", );

//authroised user allowed on these route
//app.use('/api', protect, apiRouter)
app.use("/api", apiRouter);

// Error Handlers
app.all("*", handle404s);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
