const db = require("../database/connection.js");

exports.checkStudentByUsername = async (username) => {
  const checkUserQuery = 'SELECT * FROM student WHERE student_username=$1;'
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
}


exports.insertNewStudent =  exports.insertStudent = (student) => {
  const {
    student_username,
    student_firstname,
    student_lastname,
    student_email,
    student_active,
    student_password,
    student_grade,
    student_targetgrade,
    student_notes,
    student_progressbar,
    student_image,
  } = student;

  return db
    .query(
      `INSERT INTO student (student_username,student_firstname, student_lastname, student_email, student_password, student_grade, student_active,student_targetgrade, student_notes, student_progressbar, student_image ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11  ) RETURNING *; `,
      [
        student_username,
        student_firstname,
        student_lastname,
        student_email,
        student_password,
        student_grade,
        student_active,
        student_targetgrade,
        student_notes,
        student_progressbar,
        student_image,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
