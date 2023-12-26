const Router = require('express');
const { body } = require('express-validator');
const { handleInputErrors } = require('../helpers/errorHelper');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
  verifyToken,
  loginAdmin,
  loginTutor,
  loginStudent,
  logoutAdmin,
  logoutTutor,
  logoutStudent,
  createNewAdmin,
  createNewTutor,
  createNewStudent,
} = require('../modules/auths/authController');

const router = Router();
router
  .get('/verify-token', userAuthorization(['admin', 'tutor', 'student']), verifyToken)

  .delete('/signout-admin', userAuthorization(['admin']), logoutAdmin)
  .post('/signin-admin', body('username').isString(), handleInputErrors, loginAdmin)
  .post('/signup-admin', body('admin_username').isString(), handleInputErrors, createNewAdmin)

  .delete( '/signout-tutor', userAuthorization(['tutor']), logoutTutor)
  .post('/signin-tutor', body('username').isString(), handleInputErrors, loginTutor)
  .post('/signup-tutor', body('tutor_username').isString(), handleInputErrors, createNewTutor)

  .delete('/signout-student', userAuthorization(['student']), logoutStudent)
  .post('/signin-student', body('username').isString(), handleInputErrors, loginStudent)
  .post('/signup-student', body('student_username').isString(), handleInputErrors, createNewStudent);
  
module.exports = router;
