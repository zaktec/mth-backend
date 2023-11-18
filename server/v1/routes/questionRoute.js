const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getQuestions,
    postQuestion,
    getQuestionById,
    deleteQuestionById,
    updateQuestionById,
} = require('../modules/questions/questionController');

const router = Router();
router
  .get('/get-questions', userAuthorization(['admin']), getQuestions)
  .post('/post-question', userAuthorization(['admin']), postQuestion)
  .get('/get-questions/:question_id', userAuthorization(['admin']), getQuestionById)
  .patch('/update-questions/:question_id', userAuthorization(['admin']), updateQuestionById)
  .delete('/delete-questions/:question_id', userAuthorization(['admin']), deleteQuestionById);

module.exports = router;
