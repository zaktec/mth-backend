const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    postQuiz,
    getQuizzes,
    getQuizById,
    updateQuizById,
    deleteQuizById,
    postStudentQuiz,
    getStudentQuizzes,
    postStudentQuizResult,
    updateStudentQuizResult,
    postStudentQuizShareableLink,
} = require('../modules/quizzes/quizController');

const router = Router();
router
    .post('/post-quiz', userAuthorization(['admin']), postQuiz)
    .get('/get-quizzes/:quiz_id', userAuthorization(['admin']), getQuizById)
    .patch('/update-quizzes/:quiz_id', userAuthorization(['admin']), updateQuizById)
    .delete('/delete-quizzes/:quiz_id', userAuthorization(['admin']), deleteQuizById)
    .get('/get-quizzes', userAuthorization(['admin', 'tutor', 'student']), getQuizzes)
    .post('/post-reset-quiz/:studentquiz_id', userAuthorization(['tutor']), updateStudentQuizResult)
    .post('/post-student-quizzes/:student_id/:quiz_id', userAuthorization(['tutor']), postStudentQuiz)
    .get('/get-student-quizzes/:student_id', userAuthorization(['tutor', 'student']), getStudentQuizzes)
    .post('/post-tutor-feedback/:studentquiz_id', userAuthorization(['tutor']), updateStudentQuizResult)
    .post('/post-student-feedback/:studentquiz_id', userAuthorization(['student']), updateStudentQuizResult)
    .post('/post-student-quiz-result/:studentquiz_id', userAuthorization(['student']), postStudentQuizResult)
    .post('/post_student-shareable-link/:studentquiz_id', userAuthorization(['tutor']), postStudentQuizShareableLink);

module.exports = router;
