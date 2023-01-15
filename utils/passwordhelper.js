const bcrypt = require("bcryptjs");


exports.comparePasswords =  async (password, hash) => {
    console.log("jdjdj")
    return bcrypt.compareSync(password, hash);
  };
  exports.hashPassword = async (password) => {
    return bcrypt.hashSync(password, 5);
  };

