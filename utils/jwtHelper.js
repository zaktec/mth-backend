const jwt = require("jsonwebtoken");

exports.generateTutorJWT = async (tutor_id) => {
  return jwt.sign({ tutor_id }, process.env.JWT_SECRET);
};

exports.generateAdminJWT = async (admin_id, admin_device_id) => {
  return jwt.sign({ admin_id, admin_device_id }, process.env.JWT_SECRET);
};

exports.generateStudentJWT = async (student_id) => {
  return jwt.sign({ student_id }, process.env.JWT_SECRET);
};
