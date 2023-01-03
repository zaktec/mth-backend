const db = require("../../database/connection.js");

exports.selectTutors = (sort_by = "tutor_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "tutor_firstname",
      "tutor_lastname",
      "tutor_email",
      "tutor_active",
      "tutor_image",
      "tutor_id",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  return db
    .query(`SELECT * FROM tutor ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      return result.rows;
    });
};

exports.selectTutorById = (tutor_id) => {
  let queryString = "SELECT * FROM tutor";
  const queryParams = [];
  if (tutor_id) {
    queryString += " where tutor_id=$1;";
    queryParams.push(tutor_id);
  }
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows[0];
  });
};

exports.insertTutor = (tutor) => {
  const {
    tutor_username,
    tutor_firstname,
    tutor_lastname,
    tutor_email,
    tutor_active,
    tutor_image,
    tutor_password,
  } = tutor;

  return db
    .query(
      `INSERT INTO tutor (tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password) VALUES ($1, $2, $3, $4, $5, $6, $7  ) RETURNING *; `,
      [
        tutor_username,
        tutor_firstname,
        tutor_lastname,
        tutor_email,
        tutor_active,
        tutor_image,
        tutor_password,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteTutorById = (tutor_id) => {
  return db
    .query("DELETE FROM tutor WHERE tutor_id = $1 RETURNING *", [tutor_id])
    .then((result) => {
      //console.log(result)
      return result.rows[0];
    });
};

exports.updateTutorById = (tutor, tutor_id) => {
  const {
    tutor_username,
    tutor_firstname,
    tutor_lastname,
    tutor_email,
    tutor_active,
    tutor_image,
    tutor_password,
  } = tutor;
  return db
    .query(
      `UPDATE tutor SET  tutor_username=$1, tutor_firstname = $2, tutor_lastname = $3, tutor_email= $4, tutor_active= $5, tutor_image = $6, tutor_password= $7 WHERE tutor_id = $8 RETURNING *;`,
      [
        tutor_username,
        tutor_firstname,
        tutor_lastname,
        tutor_email,
        tutor_active,
        tutor_image,
        tutor_password,
        tutor_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
