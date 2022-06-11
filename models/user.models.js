const db = require("../database/index.js")


exports.selectUsers = () => {
return db.query("SELECT * FROM users;").then((result) => {
  
   return result.rows;

});


};

exports.selectUserById = () => {};

exports.insertUser = () => {};

exports.deleteUserById= () => {};

exports.updateUserById  = () => {}; 