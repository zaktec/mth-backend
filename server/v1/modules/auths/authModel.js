const db = require('../../configs/database/connection');
const { generateAdminJWT, generateTutorJWT, generateStudentJWT } = require('../../helpers/jwtHelper');

exports.checkAdminById = async (id) => {
  const checkUserQuery = 'SELECT * FROM admin WHERE admin_id=$1;';
  const data = await db.query(checkUserQuery, [id]);
  return data.rows[0];
};

exports.checkStudentById = async (id) => {
  const checkUserQuery = 'SELECT * FROM student WHERE student_id=$1;';
  const data = await db.query(checkUserQuery, [id]);
  return data.rows[0];
};

exports.checkAdminByUsername = async (username) => {
  const checkUserQuery = 'SELECT * FROM admin WHERE admin_username=$1;';
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
};

exports.checkTutorByUsername = async (username) => {
  const checkUserQuery = 'SELECT * FROM tutor WHERE tutor_username=$1;';
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
};

exports.checkTutorById = async (id) => {
  const checkUserQuery = 'SELECT * FROM tutor WHERE tutor_id=$1;';
  const data = await db.query(checkUserQuery, [id]);
  return data.rows[0];
};

exports.checkStudentByUsername = async (username) => {
  const checkUserQuery = 'SELECT * FROM student WHERE student_username=$1;';
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
};

exports.checkAuthAdmin = async (admin_id, auth_admin_token) => {
  const checkAuthAdminQuery =
    'SELECT * FROM authAdmin WHERE admin_id=$1 AND auth_admin_token=$2;';
  const data = await db.query(checkAuthAdminQuery, [
    admin_id,
    auth_admin_token,
  ]);

  return data.rows[0];
};

exports.checkAuthTutor = async (tutor_id, auth_tutor_token) => {
  const checkAuthTutorQuery =
    'SELECT * FROM authTutor WHERE tutor_id=$1 AND auth_tutor_token=$2;';
  const data = await db.query(checkAuthTutorQuery, [
    tutor_id,
    auth_tutor_token,
  ]);

  return data.rows[0];
};

exports.checkAuthStudent = async (student_id, auth_student_token) => {
  const checkAuthTutorQuery =
    'SELECT * FROM authStudent WHERE student_id=$1 AND auth_student_token=$2;';
  const data = await db.query(checkAuthTutorQuery, [
    student_id,
    auth_student_token,
  ]);

  return data.rows[0];
};

exports.insertAuthAdmin = async (admin_id, admin_device_id) => {
  const checkAuthAdminQuery =
    'SELECT * FROM authAdmin WHERE admin_id=$1 AND admin_device_id=$2;';
  const data = await db.query(checkAuthAdminQuery, [admin_id, admin_device_id]);

  if (data.rows.length === 0) {
    const InsertQuery = `INSERT INTO authAdmin (admin_id, admin_device_id, auth_admin_token) VALUES ($1, $2, $3) RETURNING *;`;
    const token = await generateAdminJWT(admin_id, admin_device_id);
    const data = await db.query(InsertQuery, [
      admin_id,
      admin_device_id,
      token,
    ]);

    return data.rows[0];
  }

  return data.rows[0];
};

exports.insertAuthTutor = async (tutor_id, tutor_device_id) => {
  const checkAuthTutorQuery =
    'SELECT * FROM authTutor WHERE tutor_id=$1 AND tutor_device_id=$2;';
  const data = await db.query(checkAuthTutorQuery, [tutor_id, tutor_device_id]);

  if (data.rows.length === 0) {
    const InsertQuery = `INSERT INTO authTutor (tutor_id, tutor_device_id, auth_tutor_token) VALUES ($1, $2, $3) RETURNING *;`;
    const token = await generateTutorJWT(tutor_id, tutor_device_id);
    const data = await db.query(InsertQuery, [
      tutor_id,
      tutor_device_id,
      token,
    ]);

    return data.rows[0];
  }

  return data.rows[0];
};

exports.insertAuthStudent = async (student_id, student_device_id) => {
  const checkAuthStudentQuery =
    'SELECT * FROM authStudent WHERE student_id=$1 AND student_device_id=$2;';
  const data = await db.query(checkAuthStudentQuery, [
    student_id,
    student_device_id,
  ]);

  if (data.rows.length === 0) {
    const InsertQuery = `INSERT INTO authStudent (student_id, student_device_id, auth_student_token) VALUES ($1, $2, $3) RETURNING *;`;
    const token = await generateStudentJWT(student_id, student_device_id);
    const data = await db.query(InsertQuery, [
      student_id,
      student_device_id,
      token,
    ]);

    return data.rows[0];
  }

  return data.rows[0];
};

exports.destroyAuthAdmin = async (
  admin_id,
  admin_device_id,
  auth_admin_token
) => {
  const checkAuthAdminQuery =
    'DELETE FROM authAdmin WHERE admin_id = $1 AND admin_device_id=$2 AND auth_admin_token = $3;';
  await db.query(checkAuthAdminQuery, [
    admin_id,
    admin_device_id,
    auth_admin_token,
  ]);
};

exports.destroyAuthTutor = async (
  tutor_id,
  tutor_device_id,
  auth_tutor_token
) => {
  const checkAuthTutorQuery =
    'DELETE FROM authTutor WHERE tutor_id = $1 AND tutor_device_id=$2 AND auth_tutor_token = $3;';
  await db.query(checkAuthTutorQuery, [
    tutor_id,
    tutor_device_id,
    auth_tutor_token,
  ]);
};

exports.destroyAuthStudent = async (
  student_id,
  student_device_id,
  auth_student_token
) => {
  const checkAuthStudentQuery =
    'DELETE FROM authStudent WHERE student_id = $1 AND student_device_id=$2 AND auth_student_token = $3;';
  await db.query(checkAuthStudentQuery, [
    student_id,
    student_device_id,
    auth_student_token,
  ]);
};
