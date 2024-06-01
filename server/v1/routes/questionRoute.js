const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getQuestions,
    postQuestion,
    getQuestionById,
    getQuizQuestions,
    deleteQuestionById,
    updateQuestionById,
    viewQuizQuestions
} = require('../modules/questions/questionController');

const router = Router();
router
  .get('/get-questions', userAuthorization(['admin']), getQuestions)
  .post('/post-question', userAuthorization(['admin']), postQuestion)
  .get('/get-questions/:question_id', userAuthorization(['admin']), getQuestionById)
  .patch('/update-questions/:question_id', userAuthorization(['admin']), updateQuestionById)
  .delete('/delete-questions/:question_id', userAuthorization(['admin']), deleteQuestionById)
  .get('/get-quiz-questions/:student_id/:studentquiz_id', userAuthorization(['tutor', 'student']), getQuizQuestions)
  .get('/view-quiz-questions/:student_id/:studentquiz_id', userAuthorization(['tutor', 'student']), viewQuizQuestions);

module.exports = router;
