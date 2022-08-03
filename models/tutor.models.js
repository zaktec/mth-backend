const db = require("../database/connection.js");

exports.selectTutors = (sort_by = "tutor_id") => {
  console.log(sort_by);
  if (sort_by) {
    const allowedSortBys = [
      "tutor_firstname",
      "tutor_lastname",
      "tutor_email",
      "tutor_active",
      "tutor_image",
      "tutor_created_at",
      "tutor_id",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }

  return db
    .query(`SELECT * FROM tutor ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      console.log(result.rows);
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
          tutor_firstname,
          tutor_lastname,
          tutor_email,
          tutor_active,
          tutor_image,
          tutor_created_at,
  }= tutor;

  return db
  .query(
    `INSERT INTO tutor (tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_created_at) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *; `,
    [
      tutor_firstname,
      tutor_lastname,
      tutor_email,
      tutor_active,
      tutor_image,
      tutor_created_at,
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
    tutor_firstname,
      tutor_lastname,
      tutor_email,
      tutor_active,
      tutor_image,
      tutor_created_at,
  } = tutor;
  return db
    .query(
      `UPDATE tutor SET tutor_firstname = $1, tutor_lastname = $2, tutor_email= $3, tutor_active= $4, tutor_image = $5, tutor_created_at= $6 WHERE tutor_id = $7 RETURNING *;`,
      [
        tutor_firstname,
        tutor_lastname,
        tutor_email,
        tutor_active,
        tutor_image,
        tutor_created_at,
        tutor_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

