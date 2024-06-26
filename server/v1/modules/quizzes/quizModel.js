const db = require('../../configs/database/connection');

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

exports.selectQuizzes = async (sort_by = 'quiz_id') => {
  const InsertQuery = `SELECT * FROM quiz ORDER BY ${sort_by} ASC;`;
  const data = await db.query(InsertQuery);
  return data.rows;
};

exports.selectQuizById = async (quiz_id) => {
  let queryString = 'SELECT * FROM quiz';
  const queryParams = [];
  if (quiz_id) {
    queryString += ' where quiz_id =$1;';
    queryParams.push(quiz_id);
  }

  const data = await db.query(queryString, queryParams);
  return data.rows[0];
};

exports.insertQuiz = async (quiz) => {
  const { quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc,quiz_course_fk_id, quiz_topic_fk_id, quiz_lesson_fk_id } = quiz;
  const InsertQuery = `INSERT INTO quiz 
  (quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc, quiz_course_fk_id, quiz_topic_fk_id, quiz_lesson_fk_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`
  const data = await db.query(InsertQuery, [quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc, quiz_course_fk_id, quiz_topic_fk_id, quiz_lesson_fk_id]);
  return data.rows[0];
};

exports.deleteQuizById = async (quiz_id) => {
  const InsertQuery = 'DELETE FROM quiz WHERE quiz_id = $1 RETURNING *';
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

exports.getStudentQuiz = async (student_id, quiz_id) => {
  const queryString = `SELECT * FROM studentQuiz WHERE studentQuiz_student_fk_id=$1 AND studentQuiz_quiz_fk_id=$2;`;
  const data = await db.query(queryString, [student_id, quiz_id]);
  return data.rows[0];
};

exports.postStudentQuiz = async (body, tutor_id, student_id, quiz_id) => {
  const queryString = `INSERT INTO studentQuiz (studentQuiz_learner, studentQuiz_status, studentQuiz_result, studentQuiz_percent, studentQuiz_shareable_details, studentQuiz_tutor_feedback, studentQuiz_student_feedback, studentQuiz_tutor_feedback_toggle, studentQuiz_student_feedback_toggle, studentQuiz_quiz_fk_id, studentQuiz_tutor_fk_id, studentQuiz_student_fk_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`;
  const data = await db.query(queryString, [
    '',
    'pending',
    body.studentQuiz_result || null,
    body.studentQuiz_percent || null,
    body.studentQuiz_shareable_details || null,
    body.studentQuiz_tutor_feedback || null,
    body.studentQuiz_student_feedback || null,
    'hide',
    'hide',
    quiz_id,
    tutor_id,
    student_id,
  ]);

  return data.rows[0];
};

exports.getStudentQuizzes = async (student_id) => {
  const queryString = `SELECT * FROM studentQuiz INNER JOIN quiz ON studentQuiz.studentQuiz_quiz_fk_id = quiz.quiz_id WHERE studentQuiz_student_fk_id = $1;`
  const data = await db.query(queryString, [student_id]);
  return data.rows;
};

exports.selectStudentQuizByStudentQuizId = async (studentquiz_id) => {
  const queryString = `SELECT * FROM studentQuiz INNER JOIN quiz ON studentQuiz.studentQuiz_quiz_fk_id = quiz.quiz_id WHERE studentQuiz_id = $1;`
  const data = await db.query(queryString, [studentquiz_id]);
  return data.rows[0];
};

exports.getStudentQuizByStudentQuizId = async (student_id, studentquiz_id) => {
  const queryString = `SELECT * FROM studentQuiz WHERE studentQuiz_student_fk_id = $1 AND studentQuiz_id = $2;`;
  const data = await db.query(queryString, [student_id, studentquiz_id]);
  return data.rows[0];
};

exports.postStudentQuizResult = async (student_id, studentquiz_id, quizBody) => {  
  const parameters = [...Object.values(quizBody)];
  const keys = Object.keys(quizBody).map((key, index) => `${key} = $${index + 1}`).join(", ");
  const queryString = `UPDATE studentQuiz SET ${keys} WHERE studentQuiz_student_fk_id ='${student_id}' AND studentQuiz_id ='${studentquiz_id}' RETURNING *;`;
  const data = await db.query(queryString, parameters);
  return data.rows[0];
};

exports.updateStudentQuizResult = async (studentquiz_id, body) => {
  const parameters = [...Object.values(body)];

  const keys = Object.keys(body).map((key, index) => `${key} = $${index + 1}`).join(", ");
  const queryString = `UPDATE studentQuiz SET ${keys} WHERE studentQuiz_id='${studentquiz_id}' RETURNING *;`;

  const data = await db.query(queryString, parameters);
  return data.rows[0];
};

exports.postStudentQuizShareableLink = async (studentquiz_id, body) => {
  const parameters = [...Object.values(body)];

  const keys = Object.keys(body).map((key, index) => `${key} = $${index + 1}`).join(", ");
  let queryString = `UPDATE studentQuiz SET ${keys} WHERE studentQuiz_id='${studentquiz_id}' RETURNING *;`;
  let data = await db.query(queryString, parameters);

  queryString = `SELECT * FROM studentQuiz INNER JOIN quiz ON studentQuiz.studentQuiz_quiz_fk_id = quiz.quiz_id WHERE studentQuiz_student_fk_id = $1;`
  data = await db.query(queryString, [data.rows[0].studentquiz_student_fk_id]);
  return data.rows;
};
