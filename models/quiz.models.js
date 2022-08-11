const db = require("../database/connection.js");

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

exports.insertQuiz = (quiz) => {
  const { quiz_name, quiz_code, quiz_type } = quiz;

  return db
    .query(
      `INSERT INTO quiz (quiz_name, quiz_code,
        quiz_type) VALUES ($1, $2, $3) RETURNING *; `,
      [quiz_name, quiz_code, quiz_type]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteQuizById = (quiz_id) => {
  return db
    .query("DELETE FROM quiz WHERE quiz_id = $1 RETURNING *", [quiz_id])
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateQuizById = (quiz, quiz_id) => {
  const { quiz_name, quiz_code, quiz_type } = quiz;
  return db
    .query(
      `UPDATE quiz SET quiz_name = $1, quiz_code = $2, quiz_type = $3 WHERE quiz_id = $4 RETURNING *;`,
      [quiz_name, quiz_code, quiz_type, quiz_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
