const db = require('../../configs/database/connection');

exports.checkQuestionExists = (question_id) => {
  return db
    .query(
      `SELECT * FROM question WHERE
    question_id=$1`,
      [question_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.selectQuestions = async (sort_by = 'question_id') => {
  const InsertQuery = `SELECT * FROM question ORDER BY ${sort_by} ASC;`;
  const data = await db.query(InsertQuery);
  return data.rows;
};

exports.selectQuestionById = async (question_id) => {
  let queryString = 'SELECT * FROM question';
  const queryParams = [];
  if (question_id) {
    queryString += ' where question_id =$1;';
    queryParams.push(question_id);
  }

  const data = await db.query(queryString, queryParams);
  return data.rows[0];
};

exports.insertQuestion = async (question) => {
  const {
    question_body,
    question_ans1,
    question_ans2,
    question_ans3,
    question_image,
    question_mark,
    question_grade,
    question_type,
    question_calc,
    question_ans_sym_b,
    question_ans_sym_a,
    question_correct,
    question_explaination,
    question_ans_mark,
    question_ans_image,
    question_response1,
    question_response2,
    question_response3,
    question_workingout,
    question_feedback,
    question_quiz_fk_id,
  } = question;
  const InsertQuery = `INSERT INTO question (question_body, question_ans1, question_ans2, question_ans3, question_image, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination,question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback, question_quiz_fk_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,  $20, $21) RETURNING *;`;

  const data = await db.query(InsertQuery, [
    question_body,
    question_ans1,
    question_ans2,
    question_ans3,
    question_image,
    question_mark,
    question_grade,
    question_type,
    question_calc,
    question_ans_sym_b,
    question_ans_sym_a,
    question_correct,
    question_explaination,
    question_ans_mark,
    question_ans_image,
    question_response1,
    question_response2,
    question_response3,
    question_workingout,
    question_feedback,
    question_quiz_fk_id,
  ]);

  return data.rows[0];
};

exports.deleteQuestionById = async (question_id) => {
  const InsertQuery = 'DELETE FROM question WHERE question_id = $1 RETURNING *';
  const data = await db.query(InsertQuery, [question_id]);
  return data.rows[0];
};

exports.updateQuestionById = async (question, question_id) => {
  const {
    question_body,
    question_ans1,
    question_ans2,
    question_ans3,
    question_image,
    question_mark,
    question_grade,
    question_type,
    question_calc,
    question_ans_sym_b,
    question_ans_sym_a,
    question_correct,
    question_explaination,
    question_ans_mark,
    question_ans_image,
    question_response1,
    question_response2,
    question_response3,
    question_workingout,
    question_feedback,
    question_quiz_fk_id,
  } = question;
  const InsertQuery = `UPDATE question SET question_body = $1, question_ans1 = $2, question_ans2 = $3, question_ans3 = $4, question_image = $5, question_mark = $6, question_grade = $7, question_type = $8, question_calc = $9, question_ans_sym_b = $10, question_ans_sym_a = $11, question_correct= $12, question_explaination= $13, question_ans_mark= $14, question_ans_image= $15, question_response1 = $16, question_response2 = $17, question_response3 = $18,  question_workingout= $19,   question_feedback = $20, question_quiz_fk_id = $21 WHERE question_id = $22 RETURNING *;`;

  const data = await db.query(InsertQuery, [
    question_body,
    question_ans1,
    question_ans2,
    question_ans3,
    question_image,
    question_mark,
    question_grade,
    question_type,
    question_calc,
    question_ans_sym_b,
    question_ans_sym_a,
    question_correct,
    question_explaination,
    question_ans_mark,
    question_ans_image,
    question_response1,
    question_response2,
    question_response3,
    question_workingout,
    question_feedback,
    question_quiz_fk_id,
    question_id,
  ]);
  return data.rows[0];
};

exports.getQuizQuestions = async (quiz_id) => {
  const queryString = `SELECT * FROM question WHERE question_quiz_fk_id = $1;`
  const data = await db.query(queryString, [quiz_id]);
  return data.rows;
};
