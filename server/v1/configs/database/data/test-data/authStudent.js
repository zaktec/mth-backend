const jwt = require("jsonwebtoken");

module.exports = [
  {
    student_id: 1,
    student_device_id: '3f9a1b2c8',
    auth_student_token: jwt.sign({ student_id: 1, student_device_id: '3f9a1b2c8' }, process.env.JWT_SECRET)
  },
];
