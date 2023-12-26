const db = require('../../configs/database/connection');
const { hashPassword } = require('../../helpers/passwordhelper');

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

exports.selectTutors = async (sort_by = 'tutor_id') => {
  const InsertQuery =`SELECT * FROM tutor ORDER BY ${sort_by} ASC;`
  const data = await db.query(InsertQuery)
  return data.rows;
};

exports.selectTutorById = async (tutor_id) => {
  let queryString = 'SELECT * FROM tutor';
  const queryParams = [];
  if (tutor_id) {
    queryString += ' where tutor_id=$1;';
    queryParams.push(tutor_id);
  }
  const data =  await db.query(queryString, queryParams)
    return data.rows[0];

};

exports.insertTutor = async (tutor) => {
  const {
    tutor_username,
    tutor_firstname,
    tutor_lastname,
    tutor_email,
    tutor_active,
    tutor_image,
    tutor_password,
  } = tutor;

  const InsertQuery = `INSERT INTO tutor (tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password) VALUES ($1, $2, $3, $4, $5, $6, $7  ) RETURNING *;`
  const hashedPassword = await hashPassword(tutor_password, 10);
  const data= await db.query(InsertQuery,[
    tutor_username,
    tutor_firstname,
    tutor_lastname,
    tutor_email,
    tutor_active,
    tutor_image,
    hashedPassword,
  ])
  return data.rows[0];
};

exports.deleteTutorById = async (tutor_id) => {
  const InsertQuery = 'DELETE FROM tutor WHERE tutor_id = $1 RETURNING *'
  const data = await db.query(InsertQuery, [tutor_id])
      return data.rows[0];
};

exports.updateTutorById = async (tutor, tutor_id) => {  
  if(tutor?.tutor_password) tutor.tutor_password = await hashPassword(tutor?.tutor_password, 10);
  const parameters = [...Object.values(tutor)];

  const keys = Object.keys(tutor).map((key, index) => `${key} = $${index + 1}`).join(", ");
  const queryString = `UPDATE tutor SET ${keys} WHERE tutor_id='${tutor_id}' RETURNING *;`;

  const data = await db.query(queryString, parameters);
  return data.rows[0];
};

exports.getTutorStudents = async (student_tutor_fk_id) => {
  const queryString = `SELECT * FROM student WHERE student_tutor_fk_id = $1`;
  const data = await db.query(queryString, [student_tutor_fk_id]);
  return data.rows;
};

exports.getTutorStudentQuiz = async (student_id, quiz_id) => {
  const queryString = `SELECT * FROM studentQuiz WHERE studentQuiz_student_fk_id=$1 AND studentQuiz_quiz_fk_id=$2;`;
  const data = await db.query(queryString, [student_id, quiz_id]);
  return data.rows[0];
};

exports.postTutorStudentQuiz = async (body, tutor_id, student_id, quiz_id) => {
  const queryString = `INSERT INTO studentQuiz (studentQuiz_result, studentQuiz_percent, studentQuiz_feedback, studentQuiz_quiz_fk_id, studentQuiz_tutor_fk_id, studentQuiz_student_fk_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const data = await db.query(queryString, [
    body.studentQuiz_result || 0,
    body.studentQuiz_percent || 0,
    body.studentQuiz_feedback || null,
    quiz_id,
    tutor_id,
    student_id,
  ]);

  return data.rows[0];
};

exports.getTutorStudentQuizzes = async (student_id) => {
  const queryString = `SELECT * FROM studentQuiz INNER JOIN quiz ON studentQuiz.studentQuiz_quiz_fk_id = quiz.quiz_id WHERE studentQuiz_student_fk_id = $1;`
  const data = await db.query(queryString, [student_id]);
  return data.rows;
};
