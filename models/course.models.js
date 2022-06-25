const db = require("../database/connection.js")


exports.selectCourses = () => {
return db.query("SELECT * FROM course;").then(( { rows }) => {
  
   //console.log(rows)
   return rows;

});


};

exports.selectCourseById = () => {};

exports.insertCourse = () => {};

exports.deleteCourseById= () => {};

exports.updateCourseById  = () => {}; 