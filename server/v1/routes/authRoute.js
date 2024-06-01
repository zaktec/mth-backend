const Router = require('express');
const { body } = require('express-validator');
const { handleInputErrors } = require('../helpers/errorHelper');
const { userAuthorization } = require('../middlewares/authMiddleware');
const { validateSignin, validateStudentSignin } = require('../middlewares/bodySchemaMiddleware');

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
  verifyShareableLink,
} = require('../modules/auths/authController');

/**
 * Routers for Authentication
 * 
 */

const router = Router();
router
  .get('/verify-shareable-link', userAuthorization(['student']), verifyShareableLink)
  .get('/verify-token', userAuthorization(['admin', 'tutor', 'student']), verifyToken)

  .delete('/signout-admin', userAuthorization(['admin']), logoutAdmin)
  .post('/signin-admin', body('username').isString(), handleInputErrors, validateSignin, loginAdmin)
  .post('/signup-admin', body('admin_username').isString(), handleInputErrors, createNewAdmin)

  .delete( '/signout-tutor', userAuthorization(['tutor']), logoutTutor)
  .post('/signin-tutor', body('username').isString(), handleInputErrors,  validateSignin,loginTutor)
  .post('/signup-tutor', body('tutor_username').isString(), handleInputErrors, createNewTutor)

  .delete('/signout-student', userAuthorization(['student']), logoutStudent)
  .post('/signup-student', body('student_username').isString(), handleInputErrors, createNewStudent)
  .post('/signin-student', body('username').isString(), handleInputErrors, validateStudentSignin, loginStudent);
module.exports = router;
