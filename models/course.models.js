const db = require("../database/index.js")


exports.selectCourses = () => {
return db.query("SELECT * FROM course;").then((result) => {
  
   return result.rows;

});


};

exports.selectCourseById = () => {};

exports.insertCourse = () => {};

exports.deleteCourseById= () => {};

exports.updateCourseById  = () => {}; 