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
} = require('../modules/tutors/tutorController');

const router = Router();
router
    .get('/get-tutors', userAuthorization(['admin']), getTutors)
    .post('/post-tutor', userAuthorization(['admin']), postTutor)
    .get('/get-tutor-students', userAuthorization(['tutor']), getTutorStudents)
    .get('/get-tutor-dashboard', userAuthorization(['tutor']), getTutorDashboard)
    .get('/get-tutors/:tutor_id', userAuthorization(['admin', 'tutor']), getTutorById)
    .patch('/update-tutors/:tutor_id', userAuthorization(['admin', 'tutor']), updateTutorById)
    .delete('/delete-tutors/:tutor_id', userAuthorization(['admin', 'tutor']), deleteTutorById);

module.exports = router;
