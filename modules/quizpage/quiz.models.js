const db = require("../../database/connection.js");

exports.selectQuizzes = async (sort_by = "quiz_id") => {
  if (sort_by) {
    const allowedSortBys = ["quiz_id", "quiz_code", "quiz_name", "quiz_type"];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  const InsertQuery = `SELECT * FROM quiz ORDER BY ${sort_by} ASC;`;
  const data = await db.query(InsertQuery);
  return data.rows;
};

exports.selectQuizById = async (quiz_id) => {
  let queryString = "SELECT * FROM quiz";
  const queryParams = [];
  if (quiz_id) {
    queryString += " where quiz_id =$1;";
    queryParams.push(quiz_id);
  }

  const data = await db.query(queryString, queryParams);
  return data.rows[0];
};

exports.insertQuiz = async (quiz) => {
  const { quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc,quiz_course_fk_id, quiz_topic_fk_id, quiz_lesson_fk_id } = quiz;
  console.log(quiz)
  const InsertQuery = `INSERT INTO quiz 
  (quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc, quiz_course_fk_id, quiz_topic_fk_id, quiz_lesson_fk_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`
  console.log(InsertQuery)
  const data = await db.query(InsertQuery, [quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc, quiz_course_fk_id, quiz_topic_fk_id, quiz_lesson_fk_id]);
 // console.log(data)
  return data.rows[0];
};

exports.deleteQuizById = async (quiz_id) => {
  const InsertQuery = "DELETE FROM quiz WHERE quiz_id = $1 RETURNING *";
  const data = await db.query(InsertQuery, [quiz_id]);
  return data.rows[0];
};

exports.updateQuizById = async (quiz, quiz_id) => {
  const { quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc, quiz_course_fk_id, quiz_topic_fk_id, quiz_lesson_fk_id } = quiz;
  const InsertQuery = `UPDATE quiz SET quiz_name = $1, quiz_code = $2, quiz_desc = $3, quiz_type = $4, quiz_calc = $5, quiz_course_fk_id = $6,quiz_topic_fk_id = $7,  quiz_lesson_fk_id = $8  WHERE quiz_id = $9 RETURNING *;`;
  const data = await db.query(InsertQuery, [
    quiz_name,
    quiz_code,
    quiz_desc,
    quiz_type,
    quiz_calc,
    quiz_course_fk_id,
    quiz_topic_fk_id,
    quiz_lesson_fk_id,
    quiz_id,
  ]);
  return data.rows[0];
};
