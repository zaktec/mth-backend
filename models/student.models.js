const db = require("../database/connection.js");

exports.selectStudents = (sort_by = "student_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "student_id",
      "student_firstname",
      "student_lastname",
      "student_email",
      "student_active",
      "student_quizresult",
      "student_grade",
      "student_targetgrade",
      "student_notes",
      "student_progressbar",
      "student_image",
      "student_created_at",
      "student_course_id",
      "student_tutor_id",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  return db
    .query(`SELECT * FROM student ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      return result.rows;
    });
};

exports.selectUserById = () => {};

exports.insertUser = () => {};

exports.deleteUserById = () => {};

exports.updateUserById = () => {};
