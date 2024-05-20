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
    question_image,
    question_body,
    question_answer1,
    question_answer2,
    question_answer3,
    question_answer4,
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
    question_number,
    question_lesson_fk_id,
    question_quiz_fk_id,
  } = question;

  const InsertQuery = `INSERT INTO question (question_image, question_body, question_answer1, question_answer2, question_answer3, question_answer4, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination, question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback, question_number, question_lesson_fk_id, question_quiz_fk_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING *;`;
  const data = await db.query(InsertQuery, [
    question_image,
    question_body,
    question_answer1,
    question_answer2,
    question_answer3,
    question_answer4,
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
    question_number,
    question_lesson_fk_id,
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
  const parameters = [...Object.values(question)];
  
  const keys = Object.keys(question).map((key, index) => `${key} = $${index + 1}`).join(", ");
  const queryString = `UPDATE question SET ${keys} WHERE question_id='${question_id}' RETURNING *;`;

  const data = await db.query(queryString, parameters);
  return data.rows[0];
};

exports.getStudentQuiz = async (student_id, quiz_id) => {
  const queryString = `SELECT * FROM studentQuiz WHERE studentQuiz_student_fk_id=$1 AND studentQuiz_id=$2;`;
  const data = await db.query(queryString, [student_id, quiz_id]);
  return data.rows[0];
};

exports.getQuizQuestions = async (quiz_id) => {
  queryString = `SELECT * FROM question WHERE question_quiz_fk_id = $1 ORDER BY question_number;`;
  const data = await db.query(queryString, [quiz_id]);
  return data.rows;
};

exports.viewQuizQuestions = async (quiz_id) => {
  queryString = `SELECT * FROM question WHERE question_quiz_fk_id = $1 ORDER BY RANDOM();`;
  const data = await db.query(queryString, [quiz_id]);
  return data.rows;
};
