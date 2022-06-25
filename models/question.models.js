const db = require("../database/connection.js")


exports.selectQuestions = () => {
return db.query("SELECT * FROM question;").then((result) => {
  
   return result.rows;

});


};

exports.selectUserById = () => {};

exports.insertUser = () => {};

exports.deleteUserById= () => {};

exports.updateUserById  = () => {}; 