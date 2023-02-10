const db = require("../../database/connection.js");

exports.selectAdmin = async (sort_by = "admins_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "admins_id",
      "admins_username",
      "admins_firstname",
      "admins_lastname",
      "admins_email",
      "admins_active",
      "admins_image",
    ];
   if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  const InsertQuery = `SELECT * FROM admins ORDER BY ${sort_by} ASC`;
  const data = await db.query(InsertQuery);
  return data.rows;
};

exports.selectAdminById = async (admins_id) => {
  let queryString = "SELECT * FROM admins";
  const queryParams = [];
  if (admins_id) {
    queryString += " where admins_id=$1;";
    queryParams.push(admins_id);
  }
  const data = await db.query(queryString, queryParams);
  return data.rows[0];
};

exports.insertAdmin = async (admin) => {
  const {
    admins_username,
    admins_firstname,
    admins_lastname,
    admins_email,
    admins_active,
    admins_image,
    admins_password,
  } = admin;
  const InsertQuery =
    "INSERT INTO admins (admins_username, admins_firstname, admins_lastname, admins_email, admins_active, admins_image, admins_password) VALUES ($1, $2, $3, $4, $5, $6, $7  ) RETURNING *;";
  const data = await db.query(InsertQuery, [
    admins_username,
    admins_firstname,
    admins_lastname,
    admins_email,
    admins_active,
    admins_image,
    admins_password,
  ]);
  return data.rows[0];
};

exports.deleteAdminById = async (admins_id) => {
  const InsertQuery = "DELETE FROM admins WHERE  admins_id = $1 RETURNING *";
  const data = await db.query(InsertQuery, [admins_id]);
  return data.rows[0];
};

exports.updateAdminById = async (admin, admins_id) => {
  const {
    admins_username,
    admins_firstname,
    admins_lastname,
    admins_email,
    admins_active,
    admins_image,
    admins_password,
  } = admin;
  const InsertQuery = `UPDATE admins SET  admins_username=$1, admins_firstname = $2, admins_lastname = $3, admins_email= $4, admins_active= $5, admins_image = $6, admins_password= $7 WHERE admins_id = $8 RETURNING *;`;
  const data = await db.query(InsertQuery, [
    admins_username,
    admins_firstname,
    admins_lastname,
    admins_email,
    admins_active,
    admins_image,
    admins_password,
    admins_id,
  ]);
  return data.rows[0];
};
