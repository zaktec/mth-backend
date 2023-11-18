const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getLessons,
    postLesson,
    getLessonById,
    deleteLessonById,
    updateLessonById,
} = require('../modules/lessons/lessonController');

const router = Router();
router
  .get('/get-lessons', userAuthorization(['admin']), getLessons)
  .post('/post-lesson', userAuthorization(['admin']), postLesson)
  .get('/get-lessons/:lesson_id', userAuthorization(['admin']), getLessonById)
  .patch('/update-lessons/:lesson_id', userAuthorization(['admin']), updateLessonById)
  .delete('/delete-lessons/:lesson_id', userAuthorization(['admin']), deleteLessonById);

module.exports = router;
