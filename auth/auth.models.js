const connection = require("../database/connection.js");

exports.checkUser = (username, password) => {
  return connection
    .query("student")
    .select("*")
    .where({ username })
    .first()
    .then(user);
  return user;
};
