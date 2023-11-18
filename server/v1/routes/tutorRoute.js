const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getTutors,
    postTutor,
    getTutorById,
    updateTutorById,
    deleteTutorById,
    getTutorDashboard,
} = require('../modules/tutors/tutorController');

const router = Router();
router
    .get('/get-tutors', userAuthorization(['admin']), getTutors)
    .post('/post-tutor', userAuthorization(['admin']), postTutor)
    .get('/get-tutors/:tutor_id', userAuthorization(['admin']), getTutorById)
    .get('/get-tutor-dashboard', userAuthorization(['tutor']), getTutorDashboard)
    .patch('/update-tutors/:tutor_id', userAuthorization(['admin']), updateTutorById)
    .delete('/delete-tutors/:tutor_id', userAuthorization(['admin']), deleteTutorById);

module.exports = router;
