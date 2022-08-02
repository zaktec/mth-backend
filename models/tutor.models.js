const db = require("../database/connection.js")


exports.selectTutors = () => {
return db.query("SELECT * FROM tutor;").then((result) => {
  //console.log(result.rows)
   return result.rows;

});


};

exports.selectUserById = () => {};

exports.insertUser = () => {};

exports.deleteUserById= () => {};

exports.updateUserById  = () => {}; 