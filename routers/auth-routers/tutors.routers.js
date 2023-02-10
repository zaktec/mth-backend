const express = require("express");
const {
  getTutors,
  getTutorById,
  postTutor,
  removeTutorById,
  patchTutorById,
} = require("../../modules/tutorpage/tutor.controllers.js");
const tutorRouter = express.Router();

// everything starts with /api/articles

tutorRouter.get("/", getTutors);
tutorRouter.get("/:tutor_id", getTutorById);
tutorRouter.post("/", postTutor);
tutorRouter.delete("/:tutor_id", removeTutorById);
tutorRouter.patch("/:tutor_id", patchTutorById);

module.exports = tutorRouter;
