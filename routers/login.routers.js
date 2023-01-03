const express = require("express");
const { loginUser } = require("../auth/auth.controllers");

const loginRouter = express.Router();

loginRouter.post("/", loginUser);

module.exports = loginRouter;
