const jwt = require('jsonwebtoken');
const { checkAdminById, checkAuthAdmin } = require('../auth/auth.models');


exports.verifyAdmin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) return res.status(401).json({
      status: 401,
      message: 'Unauthorized. Token no found',
    });

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: 'halt intruder! get outta here',
        });
      } else {
        if (payload.admin_id === undefined && payload.admin_device_id === undefined)  return res.status(401).json({
          status: 401,
          message: 'Unauthorized. Not admin token',
        });
        
        
        const adminExist = await checkAdminById(payload.admin_id);
        const authExist = await checkAuthAdmin(payload.admin_id, token);

        if(adminExist && authExist) {
          req.admin = { admin_id: payload.admin_id, admin_device_id: payload.admin_device_id, auth_admin_token: token };
          next();
        }
        else 
          return res.status(401).json({
            status: 401,
            message: 'Already logged out. Login and try again.',
          });
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

exports.verifyTutor = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) return res.status(401).json({
      status: 401,
      message: 'Unauthorized. Token no found',
    });

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: 'halt intruder! get outta here',
        });
      } else {
        if (payload.tutor_id === undefined)  return res.status(401).json({
          status: 401,
          message: 'Unauthorized. Not tutor token',
        });
        
        req.tutor_id = payload.tutor_id;
        next();
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

exports.verifyStudent = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) return res.status(401).json({
      status: 401,
      message: 'Unauthorized. Token no found',
    });

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: 'halt intruder! get outta here',
        });
      } else {
        if (payload.student_id === undefined)  return res.status(401).json({
          status: 401,
          message: 'Unauthorized. Not student token',
        });
        
        req.student_id = payload.student_id;
        next();
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