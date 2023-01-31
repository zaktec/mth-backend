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

exports.checkLessonExists = (lesson_id) => {
  return db
    .query(
      `SELECT * FROM lesson WHERE
    lesson_id=$1`,
      [lesson_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkQuizExists = (quiz_id) => {
  return db
    .query(
      `SELECT * FROM quiz WHERE
    quiz_id=$1`,
      [quiz_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkQuestionExists = (ques_id) => {
  return db
    .query(
      `SELECT * FROM question WHERE
    ques_id=$1`,
      [ques_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkAdminExist = (admins_id) => {
  return db
    .query(
      `SELECT * FROM admins WHERE 
    admins_id=$1`,
      [admins_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};
