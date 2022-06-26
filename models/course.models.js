const db = require("../database/connection.js")


exports.selectCourses = () => {
return db.query("SELECT * FROM course;").then(( result) => {
  
   //console.log(result)
   return result.rows;

});


};

exports.selectCourseById = () => {};

exports.insertCourse = () => {};

exports.deleteCourseById= () => {};

exports.updateCourseById  = () => {}; 