const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
  getCourses,
  postCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require('../modules/courses/courseController');

const router = Router();
router
  .get('/get-courses', userAuthorization(['admin']), getCourses)
  .post('/post-course', userAuthorization(['admin']), postCourse)
  .get('/get-courses/:course_id', userAuthorization(['admin']), getCourseById)
  .patch('/update-courses/:course_id', userAuthorization(['admin']), updateCourseById)
  .delete('/delete-courses/:course_id', userAuthorization(['admin']), deleteCourseById);

module.exports = router;
