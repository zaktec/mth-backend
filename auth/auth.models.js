const db = require("../database/connection.js");

exports.checkStudentByUsername = async (username) => {
  const checkUserQuery = "SELECT * FROM student WHERE student_username=$1;";
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
};

exports.checkAdminByUsername = async(username) =>{
  const checkUserQuery = "SELECT * FROM admin WHERE admin_username=$1;";
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
}

exports.checkTutorByUsername = async(username) =>{
  const checkUserQuery = "SELECT * FROM tutor WHERE tutor_username=$1;";
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
}

