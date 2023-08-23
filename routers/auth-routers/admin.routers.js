const express = require("express");
const {
  getAdmin,
  getAdminById,
  removeAdminById,
  postAdmin,
  patchAdminById,
} = require("../../modules/adminpage/admin.controller");

const adminRouter = express.Router();

adminRouter.get("/", getAdmin);
adminRouter.get("/:admin_id", getAdminById);
adminRouter.post("/", postAdmin);
adminRouter.delete("/:admin_id", removeAdminById);
adminRouter.patch("/:admin_id", patchAdminById);

module.exports = adminRouter;
