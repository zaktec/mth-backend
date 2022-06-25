const db = require("../database/connection.js")


exports.selectDigitutors = () => {
return db.query("SELECT * FROM digitutor;").then((result) => {
  
   return result.rows;

});


};

exports.selectDigitutorById = () => {};

exports.insertDigitutor = () => {};

exports.deleteDigitutorById= () => {};

exports.updateDigitutorById  = () => {}; 