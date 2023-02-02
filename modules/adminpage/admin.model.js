const db = require("../../database/connection.js");

exports.selectAdmin = (sort_by = "admins_id") => {
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
  return db
    .query(`SELECT * FROM admins ORDER BY ${sort_by} ASC`)
    .then((result) => {
      return result.rows;
    });
};

exports.selectAdminById = (admins_id) => {
  let queryString = "SELECT * FROM admins";
  const queryParams = [];
  if (admins_id) {
    queryString += " where admins_id=$1;";
    queryParams.push(admins_id);
  }
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows[0];
  });
};

exports.insertAdmin = (admin) => {
  const {
    admins_username,
    admins_firstname,
    admins_lastname,
    admins_email,
    admins_active,
    admins_image,
    admins_password,
  } = admin;

  return db
    .query(
      `INSERT INTO admins (admins_username, admins_firstname, admins_lastname, admins_email, admins_active, admins_image, admins_password) VALUES ($1, $2, $3, $4, $5, $6, $7  ) RETURNING *; `,
      [
        admins_username,
        admins_firstname,
        admins_lastname,
        admins_email,
        admins_active,
        admins_image,
        admins_password,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteAdminById = (admins_id) => {
  return db
    .query("DELETE FROM admins WHERE  admins_id = $1 RETURNING *", [admins_id])
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateAdminById = (admin, admins_id) => {
  const {
    admins_username,
    admins_firstname,
    admins_lastname,
    admins_email,
    admins_active,
    admins_image,
    admins_password,
  } = admin;
  return db
    .query(
      `UPDATE admins SET  admins_username=$1, admins_firstname = $2, admins_lastname = $3, admins_email= $4, admins_active= $5, admins_image = $6, admins_password= $7 WHERE admins_id = $8 RETURNING *;`,
      [
        admins_username,
        admins_firstname,
        admins_lastname,
        admins_email,
        admins_active,
        admins_image,
        admins_password,
        admins_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
