const express = require("express");
const {
  getSettingPage,
  getResit,
} = require("../../modules/dashboardadmin/setting.controllers.js");
const settingRouter = express.Router();

// everything starts with /api/articles

settingRouter.get("/", getSettingPage);
settingRouter.get("/resit", getResit);

module.exports = settingRouter;
