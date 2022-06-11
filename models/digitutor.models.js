const db = require("../database/index.js")


exports.selectDigitutors = () => {
return db.query("SELECT * FROM digitutor;").then((result) => {
  
   return result.rows;

});


};

exports.selectDigitutorById = () => {};

exports.insertDigitutor = () => {};

exports.deleteDigitutorById= () => {};

exports.updateDigitutorById  = () => {}; 