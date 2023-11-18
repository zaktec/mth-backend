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
    .get('/get-students/:student_id', userAuthorization(['admin']), getStudentById)
    .get('/get-student-dashboard', userAuthorization(['student']), getStudentDashboard)
    .patch('/update-students/:student_id', userAuthorization(['admin']), updateStudentById)
    .delete('/delete-students/:student_id', userAuthorization(['admin']), deleteStudentById);

module.exports = router;
