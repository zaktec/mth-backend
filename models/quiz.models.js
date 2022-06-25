const db = require("../database/connection.js")


exports.selectQuizzes = () => {
return db.query("SELECT * FROM quiz;").then((result) => {
  
   return result.rows;

});


};

exports.selectQuizById = () => {};

exports.insertQuiz = () => {};

exports.deleteQuizById= () => {};

exports.updateQuizById  = () => {}; 