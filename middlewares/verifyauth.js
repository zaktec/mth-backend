const jwt = require("jsonwebtoken");
const {
  checkAdminById,
  checkAuthAdmin,
  checkTutorById,
  checkAuthTutor,
  checkStudentById,
  checkAuthStudent,
} = require("../auth/auth.models");

exports.verifyAdmin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined)
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. Token no found",
      });

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: "halt intruder! get outta here",
        });
      } else {
        if (
          payload.admin_id === undefined &&
          payload.admin_device_id === undefined
        )
          return res.status(401).json({
            status: 401,
            message: "Unauthorized. Not admin token",
          });

        const adminExist = await checkAdminById(payload.admin_id);
        const authExist = await checkAuthAdmin(payload.admin_id, token);

        if (adminExist && authExist) {
          req.admin = {
            admin_id: payload.admin_id,
            admin_device_id: payload.admin_device_id,
            auth_admin_token: token,
          };
          next();
        } else
          return res.status(401).json({
            status: 401,
            message: "Already logged out. Login and try again.",
          });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
      message: "Internal Server Error",
    });
  }
};

exports.verifyTutor = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined)
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. Token no found",
      });

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: "halt intruder! get outta here",
        });
      } else {
        if (
          payload.tutor_id === undefined &&
          payload.tutor_device_id === undefined
        )
          return res.status(401).json({
            status: 401,
            message: "Unauthorized. Not tutor token",
          });

        const tutorExist = await checkTutorById(payload.tutor_id);
        const authExist = await checkAuthTutor(payload.tutor_id, token);

        if (tutorExist && authExist) {
          req.tutor = {
            tutor_id: payload.tutor_id,
            tutor_device_id: payload.tutor_device_id,
            auth_tutor_token: token,
          };
          next();
        } else
          return res.status(401).json({
            status: 401,
            message: "Already logged out. Login and try again.",
          });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
      message: "Internal Server Error",
    });
  }
};

exports.verifyStudent = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined)
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. Token no found",
      });

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: err.toString(),
          message: "halt intruder! get outta here",
        });
      } else {
        if (
          payload.student_id === undefined &&
          payload.student_device_id === undefined
        )
          return res.status(401).json({
            status: 401,
            message: "Unauthorized. Not student token",
          });
        const studentExist = await checkStudentById(payload.student_id);
        const authExist = await checkAuthStudent(payload.student_id, token);

        if (studentExist && authExist) {
          req.student = {
            student_id: payload.student_id,
            student_device_id: payload.student_device_id,
            auth_student_token: token,
          };
          next();
        } else
          return res.status(401).json({
            status: 401,
            message: "Already logged out. Login and try again.",
          });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
      message: "Internal Server Error",
    });
  }
};
