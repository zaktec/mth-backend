const express = require("express");
const {
  getAdmin,
  getAdminById,
  removeAdminById,
  postAdmin,
  patchAdminById,
  getadmindashboard,
  getSettingPage,
  getResit,
  getEndpoints,
} = require("../../modules/adminpage/admin.controller");

const adminRouter = express.Router();

//dashboard router
adminRouter.get("/admindashboard", getadmindashboard);
adminRouter.get("/settings", getSettingPage);
adminRouter.get("/resit", getResit);
adminRouter.get("/endpoints", getEndpoints);

//admin crud
adminRouter.get("/", getAdmin);
adminRouter.get("/:admin_id", getAdminById);
adminRouter.post("/", postAdmin);
adminRouter.delete("/:admin_id", removeAdminById);
adminRouter.patch("/:admin_id", patchAdminById);

module.exports = adminRouter;
