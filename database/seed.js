const db = require("../database/index.js")

function seed({courses}) {
    return db.query(`DROP DATABASE IF EXISTS topic;`).then(()=> {
     return db.query(`DROP DATABASE IF EXISTS course;`)       
    })
    .then((result) => {
     console.log(result)
     return db.query(` CREATE TABLE course (
          course_id SERIAL PRIMARY KEY,
          course_name VARCHAR(200) NOT NULL,
          course_code VARCHAR(200) NOT NULL,
          course_desc VARCHAR(200) NOT NULL,
          course_level VARCHAR(100) NOT NULL,
          course_image VARCHAR(200) NOT NULL,
          course_date timestamp 
       );
       `)   
    })
    .then(() =>{
     return db.query(` CREATE TABLE topic (
          topic_id SERIAL PRIMARY KEY,
            topic_name VARCHAR(200) NOT NULL,
            topic_code VARCHAR(200) NOT NULL,
            topic_desc VARCHAR(200) NOT NULL,
            topic_index INT,
            topic_date timestamp,
            topic_course_id INT REFERENCES course(course_id) ON DELETE CASCADE
       );
       `)
    });




}

module.exports = seed;