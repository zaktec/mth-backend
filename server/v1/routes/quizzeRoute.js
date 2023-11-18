const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    postQuiz,
    getQuizzes,
    getQuizById,
    updateQuizById,
    deleteQuizById,
} = require('../modules/quizzes/quizController');

const router = Router();
router
    .post('/post-quiz', userAuthorization(['admin']), postQuiz)
    .get('/get-quizzes', userAuthorization(['admin']), getQuizzes)
    .get('/get-quizzes/:quiz_id', userAuthorization(['admin']), getQuizById)
    .patch('/update-quizzes/:quiz_id', userAuthorization(['admin']), updateQuizById)
    .delete('/delete-quizzes/:quiz_id', userAuthorization(['admin']), deleteQuizById);

module.exports = router;
