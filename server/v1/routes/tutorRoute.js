const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getTutors,
    postTutor,
    getTutorById,
    updateTutorById,
    deleteTutorById,
    getTutorDashboard,
    getTutorStudents,
    postTutorStudentQuiz,
    getTutorStudentQuizzes,
} = require('../modules/tutors/tutorController');

const router = Router();
router
    .get('/get-tutors', userAuthorization(['admin']), getTutors)
    .post('/post-tutor', userAuthorization(['admin']), postTutor)
    .get('/get-tutor-dashboard', userAuthorization(['tutor']), getTutorDashboard)
    .get('/get-tutors/:tutor_id', userAuthorization(['admin', 'tutor']), getTutorById)
    .patch('/update-tutors/:tutor_id', userAuthorization(['admin', 'tutor']), updateTutorById)
    .delete('/delete-tutors/:tutor_id', userAuthorization(['admin', 'tutor']), deleteTutorById)

    .get('/get-tutor-students', userAuthorization(['tutor']), getTutorStudents)
    .post('/post-tutor-student-quizzes/:student_id/:quiz_id', userAuthorization(['tutor']), postTutorStudentQuiz)
    .get('/get-tutor-student-quizzes/:student_id', userAuthorization(['tutor', 'student']), getTutorStudentQuizzes);

module.exports = router;
