const db = require("../../configs/database/connection");
const { hashPassword } = require("../../helpers/passwordhelper");

exports.selectStudents = async (sort_by = "student_id") => {
  const queryString = `SELECT * FROM student ORDER BY ${sort_by} ASC;`;
  const data = await db.query(queryString);
  return data.rows;
};

exports.getStudentById = async (student_id) => {
  const queryString = `SELECT * FROM student WHERE student_id = $1`;
  const data = await db.query(queryString, [student_id]);
  return data.rows[0];
};

exports.insertStudent = async (student) => {
  const {
    student_username,
    student_firstname,
    student_lastname,
    student_email,
    student_password,
    student_active,
    student_image,
    student_grade,
    student_targetgrade,
    student_notes,
    student_progressbar,
    student_message_count,
    student_message_input,
    student_message_output,
    student_course_fk_id,
    student_tutor_fk_id,
  } = student;

  const InsertQuery = `INSERT INTO student (
    student_username,
    student_firstname,
    student_lastname,
    student_email,
    student_password,
    student_active,
    student_image,
    student_grade,
    student_targetgrade,
    student_notes,
    student_progressbar,
    student_message_count,
    student_message_input,
    student_message_output,
    student_tutor_fk_id,
    student_course_fk_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;`;
  const hashedPassword = await hashPassword(student_password, 10);
  const data = await db.query(InsertQuery, [
    student_username,
    student_firstname,
    student_lastname,
    student_email,
    hashedPassword,
    student_active,
    student_image,
    student_grade,
    student_targetgrade,
    student_notes,
    student_progressbar,
    student_message_count,
    student_message_input,
    student_message_output,
    student_course_fk_id,
    student_tutor_fk_id,
  ]);

  return data.rows[0];
};

exports.deleteStudentById = async (student_id) => {
  const InsertQuery = "DELETE FROM student WHERE student_id = $1 RETURNING *";
  const data = await db.query(InsertQuery, [student_id]);
  return data.rows[0];
};

exports.updateStudentById = async (student, student_id) => {
  if(student?.student_password) student.student_password = await hashPassword(student?.student_password, 10);
  const parameters = [...Object.values(student)];

  const keys = Object.keys(student).map((key, index) => `${key} = $${index + 1}`).join(", ");
  const queryString = `UPDATE student SET ${keys} WHERE student_id='${student_id}' RETURNING *;`;

  const data = await db.query(queryString, parameters);
  return data.rows[0];
};
