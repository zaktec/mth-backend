const db = require("../database/connection.js")


exports.selectQuizzes = (sort_by = "quiz_id") => {
   if (sort_by) {
      const allowedSortBys = ["quiz_id", "quiz_code", "quiz_name", "quiz_type"];
      if (!allowedSortBys.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: "bad request" });
      }
    }
    return db
      .query(`SELECT * FROM quiz ORDER BY ${sort_by} ASC;`)
      .then((result) => {
        //console.log(result)
        return result.rows;
      });

};

exports.selectQuizById = (quiz_id) => {
  let queryString = "SELECT * FROM quiz";
  const queryParams = [];
  if (quiz_id) {
    queryString += " where quiz_id =$1;";
    queryParams.push(quiz_id);
  }
  //console.log(queryString, queryParams);
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows[0];
  });
};

exports.insertQuiz = () => {
  const {
    course_code,
    course_desc,
    course_image,
    course_level,
    course_name,
  } = course;

  return db
    .query(
      `INSERT INTO course (course_code, course_desc,
    course_image, course_level, course_name) VALUES ($1, $2, $3, $4, $5) RETURNING *; `,
      [
        course_code,
        course_desc,
        course_image,
        course_level,
        course_name,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });

};

exports.deleteQuizById= () => {};

exports.updateQuizById  = () => {}; 