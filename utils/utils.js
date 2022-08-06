const db = require("../database/connection.js");

exports.checkCourseExists = (course_id) => {
  return db
    .query(
      `SELECT * FROM course WHERE
    course_id=$1`,
      [course_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};


exports.checkTopicExists = (topic_id) => {
  return db
    .query(
      `SELECT * FROM topic WHERE
    topic_id=$1`,
      [topic_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkTutorExists = (tutor_id) => {
  return db
    .query(
      `SELECT * FROM tutor WHERE
    tutor_id=$1`,
      [tutor_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};


exports.checkStudentExists = (student_id) => {
  return db
    .query(
      `SELECT * FROM student WHERE
    student_id=$1`,
      [student_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};