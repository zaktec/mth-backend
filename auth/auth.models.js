const db = require("../database/connection.js");
const { generateAdminJWT } = require("../utils/jwtHelper");

exports.checkAdminById = async(id) =>{
  const checkUserQuery = "SELECT * FROM admin WHERE admin_id=$1;";
  const data = await db.query(checkUserQuery, [id]);
  return data.rows[0];
}

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

exports.checkStudentByUsername = async (username) => {
  const checkUserQuery = "SELECT * FROM student WHERE student_username=$1;";
  const data = await db.query(checkUserQuery, [username]);
  return data.rows[0];
};

exports.checkAuthAdmin = async (admin_id, auth_admin_token) => {
  const checkAuthAdminQuery = "SELECT * FROM authAdmin WHERE admin_id=$1 AND auth_admin_token=$2;";
  const data = await db.query(checkAuthAdminQuery, [admin_id, auth_admin_token]);
 
  return data.rows[0];
};

exports.insertAuthAdmin = async (admin_id, admin_device_id) => {
  const checkAuthAdminQuery = "SELECT * FROM authAdmin WHERE admin_id=$1 AND admin_device_id=$2;";
  const data = await db.query(checkAuthAdminQuery, [admin_id, admin_device_id]);

  if (data.rows.length === 0) {
    const InsertQuery = `INSERT INTO authAdmin (admin_id, admin_device_id, auth_admin_token) VALUES ($1, $2, $3) RETURNING *;`;
    const token = await generateAdminJWT(admin_id, admin_device_id);
    const data = await db.query(InsertQuery,[
      admin_id,
      admin_device_id,
      token,
    ])

    return data.rows[0];
  }

  return data.rows[0];
};

exports.destroyAuthAdmin = async (admin_id, admin_device_id, auth_admin_token) => {
  const checkAuthAdminQuery = "DELETE FROM authAdmin WHERE admin_id = $1 AND admin_device_id=$2 AND auth_admin_token = $3;";
  await db.query(checkAuthAdminQuery, [admin_id, admin_device_id, auth_admin_token]);
};
