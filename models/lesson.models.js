const db = require("../database/index.js")


exports.selectLessons = () => {
return db.query("SELECT * FROM lesson;").then((result) => {
  
   return result.rows;

});


};

exports.selectLessonById = () => {};

exports.insertLesson = () => {};

exports.deleteLessonById= () => {};

exports.updateLessonById  = () => {}; 