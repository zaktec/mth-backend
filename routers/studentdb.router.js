const express = require("express");
const { getstudentdashboard } = require("../modules/dashboardstudent/studentdb.controllers");

const studentdbRouter =express.Router();


studentdbRouter.get("/studentdashboard", getstudentdashboard)

module.exports = studentdbRouter