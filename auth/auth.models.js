const db = require("../database/connection.js");

exports.checkStudentByUsername = async (username) => {
  const checkUserQuery = "SELECT * FROM student WHERE student_username=$1;";
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
};

exports.checkAdminByUsername = async(username) =>{
  const checkUserQuery = "SELECT * FROM admins WHERE admins_username=$1;";
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
}

exports.checkTutorByUsername = async(username) =>{
  const checkUserQuery = "SELECT * FROM tutor WHERE tutor_username=$1;";
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
}

// exports.insertNewStudent = (student) => {
//   const {
//     student_username,
//     student_firstname,
//     student_lastname,
//     student_email,
//     student_active,
//     student_password,
//     student_grade,
//     student_targetgrade,
//     student_notes,
//     student_progressbar,
//     student_image,
//   } = student;

//   return db
//     .query(
//       `INSERT INTO student (student_username,student_firstname, student_lastname, student_email, student_password, student_grade, student_active,student_targetgrade, student_notes, student_progressbar, student_image ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11  ) RETURNING *; `,
//       [
//         student_username,
//         student_firstname,
//         student_lastname,
//         student_email,
//         student_password,
//         student_grade,
//         student_active,
//         student_targetgrade,
//         student_notes,
//         student_progressbar,
//         student_image,
//       ]
//     )
//     .then(({ rows }) => {
//       return rows[0];
//     });
// };



// exports.insertNewAdmin = (admin) => {
//   const {
//     admins_username,
//     admins_firstname,
//     admins_lastname,
//     admins_email,
//     admins_active,
//     admins_image,
//     admins_password,
//   } = admin;

//   return db
//     .query(
//       `INSERT INTO admins (admins_username, admins_firstname, admins_lastname, admins_email, admins_active, admins_image, admins_password) VALUES ($1, $2, $3, $4, $5, $6, $7  ) RETURNING *; `,
//       [
//         admins_username,
//         admins_firstname,
//         admins_lastname,
//         admins_email,
//         admins_active,
//         admins_image,
//         admins_password,
//       ]
//     )
//     .then(({ rows }) => {
//       return rows[0];
//     });
// };

// exports.insertNewTutor = (tutor) => {
//   const {
//     tutor_username,
//     tutor_firstname,
//     tutor_lastname,
//     tutor_email,
//     tutor_active,
//     tutor_image,
//     tutor_password,
//   } = tutor;

//   return db
//     .query(
//       `INSERT INTO tutor (tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password) VALUES ($1, $2, $3, $4, $5, $6, $7  ) RETURNING *; `,
//       [
//         tutor_username,
//         tutor_firstname,
//         tutor_lastname,
//         tutor_email,
//         tutor_active,
//         tutor_image,
//         tutor_password,
//       ]
//     )
//     .then(({ rows }) => {
//       return rows[0];
//     });
// };