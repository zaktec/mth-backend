const db = require("../connection.js");
//const { topicData, courseData } = require("../data/test-data/index.js")
const format = require("pg-format");
const {
  formatCourseData,
  formatTopicData,
  formatStudentData,
  formatTutorData
} = require("../../utils/seed-formatting.js");

const seed = (data) => {
  const { courseData, topicData, studentData, tutorData } = data;
  //console.log(studentData);

  // drop everything
  return db
    .query(`DROP TABLE IF EXISTS student;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS tutor;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topic;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS course;`);
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
          course_image VARCHAR(200) NOT NULL
          
       );
       `);
    })
    .then(() => {
      return db.query(` CREATE TABLE topic (
          topic_id SERIAL PRIMARY KEY,
            topic_name VARCHAR(200) NOT NULL,
            topic_code VARCHAR(200) NOT NULL,
            topic_desc VARCHAR(200) NOT NULL,
            topic_index INT,
            topic_course_id INT REFERENCES course(course_id) ON DELETE CASCADE
       );
       `);
    })
    .then(() => {
      return db.query(` CREATE TABLE tutor (
        tutor_id SERIAL PRIMARY KEY,
        tutor_firstname VARCHAR(200) NOT NULL,
        tutor_lastname VARCHAR(200),
        tutor_email VARCHAR(200) NOT NULL,
        tutor_password VARCHAR(100) NOT NULL,
        tutor_active BOOLEAN,
        tutor_image VARCHAR(200)
        );
        `);
    })
    .then(() => {
      return db.query(`CREATE TABLE student (
        student_id SERIAL PRIMARY KEY,
          student_firstname VARCHAR(200) NOT NULL,
          student_lastname VARCHAR(200),
          student_email VARCHAR(200) NOT NULL,
          student_password VARCHAR(200) NOT NULL,
          student_active BOOLEAN,
          student_grade INT DEFAULT 0,
          student_targetgrade INT DEFAULT 0,
          student_notes VARCHAR(500),
          student_progressbar INT DEFAULT 0,
          student_image VARCHAR(200)
          );
        `);
    })
    .then(() => {
      const formattedCourses = formatCourseData(courseData);

      const sql1 = format(
        `INSERT INTO course 
     (course_name, course_code, course_desc, course_level, course_image)
     VALUES %L RETURNING *;`,
        formattedCourses
      );
      return db.query(sql1);
    })
    .then((result) => {
      // console.log(result);
    })
    .then(() => {
      //console.log(courseData);
      const formattedTopics = formatTopicData(topicData);
      const sql2 = format(
        `INSERT INTO topic 
      (topic_name, topic_code, topic_desc, topic_index,
       topic_course_id)
      VALUES %L RETURNING *;`,
        formattedTopics
      );
      return db.query(sql2);
    }).then(() => {
      //console.log(courseData);
      const formattedTutors = formatTutorData(tutorData);
      const sql3 = format(
        `INSERT INTO tutor 
      (tutor_firstname, tutor_lastname, tutor_email, tutor_password, tutor_active, tutor_image)
      VALUES %L RETURNING *;`,
        formattedTutors
      );
      //console.log(sql3)
      return db.query(sql3);
    }).then(() => {
      //console.log(courseData);
      const formattedStudents = formatStudentData(studentData);
      const sql4 = format(
        `INSERT INTO student 
      (student_firstname, student_lastname, student_email,student_password, student_active,student_image, student_grade, student_targetgrade,student_notes, student_progressbar)
      VALUES %L RETURNING *;`,
        formattedStudents

      );
      //console.log(sql3)
      return db.query(sql4);
    })
    .then((result) => {
     // console.log(result);
    });
};

module.exports = seed;
