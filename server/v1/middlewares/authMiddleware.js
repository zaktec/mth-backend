const {
  checkAdminById,
  checkAuthAdmin,
  checkTutorById,
  checkAuthTutor,
  checkStudentById,
  checkAuthStudent,
} = require('../modules/auths/authModel');
const jwt = require('jsonwebtoken');

exports.userAuthorization = (roles) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization === undefined) {
        return res.status(401).json({
          status: 401,
          message: 'Unauthorized. Token no found',
        });
      }

      const token = authorization.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            error: err.toString(),
            message: 'halt intruder! get outta here',
          });
        } else {
          if (roles.includes('admin')) {
            if (payload.admin_id !== undefined && payload.admin_device_id !== undefined) {
              const adminExist = await checkAdminById(payload.admin_id);
              const authExist = await checkAuthAdmin(payload.admin_id, token);
              if (adminExist && authExist) {
                req.admin = {
                  auth_admin_token: token,
                  admin_id: payload.admin_id,
                  admin_device_id: payload.admin_device_id,
                };
                return next();
              } else {
                return res.status(401).json({
                  status: 401,
                  message: 'Already logged out. Login and try again.',
                });
              }
            }
          }

          if (roles.includes('tutor')) {
            if (payload.tutor_id !== undefined && payload.tutor_device_id !== undefined) {
              const tutorExist = await checkTutorById(payload.tutor_id);
              const authExist = await checkAuthTutor(payload.tutor_id, token);

              if (tutorExist && authExist) {
                req.tutor = {
                  auth_tutor_token: token,
                  tutor_id: payload.tutor_id,
                  tutor_device_id: payload.tutor_device_id,
                };
                return next();
              } else {
                return res.status(401).json({
                  status: 401,
                  message: 'Already logged out. Login and try again.',
                });
              }
            }
          }

          if (roles.includes('student')) {
            if (payload.student_id !== undefined && payload.student_device_id !== undefined) {
              const studentExist = await checkStudentById(payload.student_id);
              const authExist = await checkAuthStudent(payload.student_id, token);

              if (studentExist && authExist) {
                req.student = {
                  auth_student_token: token,
                  student_id: payload.student_id,
                  student_device_id: payload.student_device_id,
                };
                return next();
              } else {
                return res.status(401).json({
                  status: 401,
                  message: 'Already logged out. Login and try again.',
                });
              }
            }
          }
          
          if (!roles.includes('admin') || !roles.includes('tutor') || !roles.includes('student')) {
            return res.status(401).json({
              status: 401,
              message: 'Unauthorized. Invalid user token',
            });
          }
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
        message: 'Internal Server Error',
      });
    }
  };
};
