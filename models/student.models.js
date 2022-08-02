const db = require("../database/connection.js")


exports.selectStudents = () => {
return db.query("SELECT * FROM student;").then((result) => {
  
   return result.rows;

});


};

exports.selectUserById = () => {};

exports.insertUser = () => {};

exports.deleteUserById= () => {};

exports.updateUserById  = () => {}; 