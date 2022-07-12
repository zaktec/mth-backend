const db = require("../database/connection.js")


exports.checkCourseExists = (course_id) =>{
    return db 
    .query(`SELECT * FROM course WHERE
    course_id=$1`, [course_id])
    .then(({ rows }) => {
        console.log(rows)
            if (rows.length){
                return true;
            } else{
                return false;
            }
            });
        };