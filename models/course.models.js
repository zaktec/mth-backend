const db = require("../database/connection.js")


exports.selectCourses = (sort_by = "course_id") => {

   if (sort_by){
      const allowedSortBys = [
        "course_id",
        "course_code",
        "course_created_at",
      ];
      if (!allowedSortBys.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: "bad request" });
      }
    }
return db.query(`SELECT * FROM course ORDER BY ${sort_by} ASC;`).then(( result) => {
  
   //console.log(result)
   return result.rows;

});

};


exports.selectCourseById = (course_id) => {
   console.log(course_id)
   let queryString = "SELECT * FROM course";
   const queryParams = [];
   if (course_id){
    queryString += " where course_id =$1;";
    queryParams.push(course_id);
   }
   console.log(queryString, queryParams)
   return db.query(queryString, queryParams).then(({ rows }) => {
    //console.log(rows)
    console.log(rows)
   return rows[0];
 
 });
 }


exports.insertCourse = () => {};

exports.deleteCourseById= () => {};

exports.updateCourseById  = () => {}; 