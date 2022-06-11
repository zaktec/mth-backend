const db = require("../database/index.js")


exports.selectAnswers = () => {
return db.query("SELECT * FROM answer;").then((result) => {
  
   return result.rows;

});


};

exports.selectAnswerById = () => {};

exports.insertAnswer = () => {};

exports.deleteAnswerById= () => {};

exports.updateAnswerById  = () => {}; 