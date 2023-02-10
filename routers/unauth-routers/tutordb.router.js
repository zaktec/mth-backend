const express = require("express");
const {
  gettutordashboard,
} = require("../../modules/dashboardtutor/tutordb.controllers");

const tutordbRouter = express.Router();

tutordbRouter.get("/tutordashboard", gettutordashboard);

module.exports = tutordbRouter;
