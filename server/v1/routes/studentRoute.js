const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getStudents,
    postStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    getStudentDashboard,
} = require('../modules/students/studentController');

const router = Router();
router
    .get('/get-students', userAuthorization(['admin']), getStudents)
    .post('/post-student', userAuthorization(['admin']), postStudent)
    .get('/get-student-dashboard', userAuthorization(['student']), getStudentDashboard)
    .delete('/delete-students/:student_id', userAuthorization(['admin', 'student']), deleteStudentById)
    .get('/get-students/:student_id', userAuthorization(['admin', 'tutor', 'student']), getStudentById)
    .patch('/update-students/:student_id', userAuthorization(['admin', 'tutor', 'student']), updateStudentById);

module.exports = router;
