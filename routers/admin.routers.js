const express = require("express");
const { getAdmin, getAdminById, removeAdminById, postAdmin, patchAdminById } = require("../modules/adminpage/admin.controller");


const adminRouter = express.Router();


adminRouter.get("/", getAdmin);
adminRouter.get("/:admins_id", getAdminById);
adminRouter.post("/", postAdmin);
adminRouter.delete("/admins_id", removeAdminById);
adminRouter.patch("/:admins_id", patchAdminById);

module.exports = adminRouter