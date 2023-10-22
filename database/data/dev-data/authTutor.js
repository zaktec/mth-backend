const jwt = require("jsonwebtoken");

module.exports = [
  {
    tutor_id: 1,
    tutor_device_id: '3f9a1b2c8',
    auth_tutor_token: jwt.sign({ tutor_id: 1, tutor_device_id: '3f9a1b2c8' }, process.env.JWT_SECRET)
  },
];
