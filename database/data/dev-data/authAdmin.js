const jwt = require("jsonwebtoken");

module.exports = [
  {
    admin_id: 1,
    admin_device_id: '3f9a1b2c8',
    auth_admin_token: jwt.sign({ admin_id: 1, admin_device_id: '3f9a1b2c8' }, process.env.JWT_SECRET)
  },
];
