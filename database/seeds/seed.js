const db = require("../connection.js")
//const { topicData, courseData } = require("../data/test-data/index.js")
const format =require('pg-format')
const { formatCourseData, formatTopicData } = require("../../utils/seed-formatting.js")


const seed = ( data ) => {
const { courseData, topicData} = data;
//console.log(topicData);

  // drop everything 
    return (
     db
     .query(`DROP TABLE IF EXISTS topic;`)
     .then(()=> {
     return db.query(`DROP TABLE IF EXISTS course;`)       
    })
    .then(() => {
     //console.log(result)

     // create tables 
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
    })
    .then(() =>{
  
     const formattedCourses = formatCourseData(courseData)
     
     const sql1 = format(
      `INSERT INTO course 
     (course_name, course_code, course_desc, course_level, course_image, course_date)
     VALUES %L RETURNING *;`, formattedCourses
     );
  return db.query(sql1);
    })
    .then((result) => {
     // console.log(result);
    })
    .then(() =>{
      //console.log(courseData);
     const formattedTopics = formatTopicData(topicData)
      const sql2 = format(
       `INSERT INTO topic 
      (topic_name, topic_code, topic_desc, topic_index, topic_date, topic_course_id)
      VALUES %L RETURNING *;`, formattedTopics
      );
   return db.query(sql2);
     })
     .then((result) => {
       //console.log(result);
   })
   )
    }

module.exports = seed;