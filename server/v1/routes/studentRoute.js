const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getStudents,
    postStudent,
    getStudentById,
    postStudentQuiz,
    getTutorStudents,
    updateStudentById,
    deleteStudentById,
    getStudentDashboard,
} = require('../modules/students/studentController');

const router = Router();
router
    .get('/get-students', userAuthorization(['admin']), getStudents)
    .post('/post-student', userAuthorization(['admin']), postStudent)
    .get('/get-student-dashboard', userAuthorization(['student']), getStudentDashboard)
    .get('/get-students/:student_id', userAuthorization(['admin', 'student']), getStudentById)
    .patch('/update-students/:student_id', userAuthorization(['admin', 'student']), updateStudentById)
    .delete('/delete-students/:student_id', userAuthorization(['admin', 'student']), deleteStudentById)
    
    .get('/get-tutor-students', userAuthorization(['tutor']), getTutorStudents)
    .post('/post-student-quizzes/:student_id/:quiz_id', userAuthorization(['tutor']), postStudentQuiz);

module.exports = router;
