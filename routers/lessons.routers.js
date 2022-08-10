const express = require("express");
const {
getLessons,
getLessonById,
postLesson,
removeLessonById,
patchLessonById,
} = require("../controllers/lesson.controllers.js");
const lessonRouter = express.Router();


// everything starts with /api/topics/

lessonRouter.get("/", getLessons);
lessonRouter.get("/:lesson_id", getLessonById);
lessonRouter.post("/", postLesson);
lessonRouter.delete("/:lesson_id", removeLessonById);
lessonRouter.patch("/:lesson_id", patchLessonById);

module.exports = lessonRouter;
