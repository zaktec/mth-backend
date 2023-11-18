const db = require('../../configs/database/connection');
const { hashPassword } = require('../../helpers/passwordhelper');

exports.checkStudentExists = (student_id) => {
  return db
    .query(
      `SELECT * FROM student WHERE
    student_id=$1`,
      [student_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.selectStudents = async (sort_by = 'student_id') => {
  if (sort_by) {
    const allowedSortBys = [
      'student_id',
      'student_firstname',
      'student_lastname',
      'student_email',
      'student_active',
      'student_grade',
      'student_targetgrade',
      'student_notes',
      'student_progressbar',
      'student_image',
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, message: 'bad request' });
    }
  }
  const InsertQuery = `SELECT * FROM student ORDER BY ${sort_by} ASC;`;
  const data = await db.query(InsertQuery);
  return data.rows;
};

exports.selectStudentById = async (student_id) => {
  let queryString = 'SELECT * FROM student';
  const queryParams = [];
  if (student_id) {
    queryString += ' where student_id=$1;';
    queryParams.push(student_id);
  }
  const data = await db.query(queryString, queryParams);
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

  const InsertQuery = `INSERT INTO student (student_username, student_firstname, student_lastname, student_email,student_password, student_active,student_image, student_grade, student_targetgrade,student_notes, student_progressbar, student_message_count, student_message_input, student_message_output, student_course_fk_id, student_tutor_fk_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13,$14,$15,$16) RETURNING *;`;
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
  const InsertQuery = 'DELETE FROM student WHERE student_id = $1 RETURNING *';
  const data = await db.query(InsertQuery, [student_id]);
  return data.rows[0];
};

exports.updateStudentById = async (student, student_id) => {
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
    student_tutor_fk_id,
    student_course_fk_id,
  } = student;

  const InsertQuery = `UPDATE student SET student_username =$1, student_firstname = $2, student_lastname = $3, student_email= $4, student_password= $5, student_active = $6, student_image = $7, student_grade = $8, student_targetgrade = $9, student_notes = $10, student_progressbar= $11, student_message_count= $12, student_message_input = $13, student_message_output = $14, student_tutor_fk_id = $15, student_course_fk_id = $16   WHERE student_id = $17 RETURNING *;`
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
    student_id,
  ]);
  return data.rows[0];
};
