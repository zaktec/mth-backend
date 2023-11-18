const Router = require('express');
const authRoute = require('./authRoute');
const topicRoute = require('./topicRoute');
const adminRoute = require('./adminRoute');
const tutorRoute = require('./tutorRoute');
const courseRoute = require('./courseRoute');
const lessonRoute = require('./lessonRoute');
const quizzeRoute = require('./quizzeRoute');
const studentRoute = require('./studentRoute');
const questionRoute = require('./questionRoute');

const router = Router();
router
    .use('/auth', authRoute)
    .use('/topics', topicRoute)
    .use('/admins', adminRoute)
    .use('/tutors', tutorRoute)
    .use('/courses', courseRoute)
    .use('/lessons', lessonRoute)
    .use('/quizzes', quizzeRoute)
    .use('/students', studentRoute)
    .use('/questions', questionRoute);

module.exports = router;
