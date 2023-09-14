const bcrypt = require("bcrypt");


exports.comparePasswords =  async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

exports.hashPassword = async (password) => {
  return bcrypt.hashSync(password, 5);
};

