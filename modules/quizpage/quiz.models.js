const db = require("../../database/connection.js");

exports.selectQuizzes = async (sort_by = "quiz_id") => {
  if (sort_by) {
    const allowedSortBys = ["quiz_id", "quiz_code", "quiz_name", "quiz_type"];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  const InsertQuery = `SELECT * FROM quiz ORDER BY ${sort_by} ASC;`
  const data = await db.query(InsertQuery)
      return data.rows;
};

exports.selectQuizById = async (quiz_id) => {
  let queryString = "SELECT * FROM quiz";
  const queryParams = [];
  if (quiz_id) {
    queryString += " where quiz_id =$1;";
    queryParams.push(quiz_id);
  }
  
const data = await db.query(queryString, queryParams)
    return data.rows[0];
};

exports.insertQuiz = async (quiz) => {
  const { quiz_name, quiz_code, quiz_type } = quiz;
  const InsertQuery = `INSERT INTO quiz (quiz_name, quiz_code,
    quiz_type) VALUES ($1, $2, $3) RETURNING *;`
  const  data = await db.query( InsertQuery, [quiz_name, quiz_code, quiz_type])
      return data.rows[0];
};

exports.deleteQuizById = async (quiz_id) => {
  const InsertQuery = "DELETE FROM quiz WHERE quiz_id = $1 RETURNING *";
  const data =  await db.query(InsertQuery, [quiz_id])
      return data.rows[0];
};

exports.updateQuizById = async (quiz, quiz_id) => {
  const { quiz_name, quiz_code, quiz_type } = quiz;
  const InsertQuery = `UPDATE quiz SET quiz_name = $1, quiz_code = $2, quiz_type = $3 WHERE quiz_id = $4 RETURNING *;`
  const data = await db.query( InsertQuery,
      [quiz_name, quiz_code, quiz_type, quiz_id])
      return data.rows[0];
};
