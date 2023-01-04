const db = require("../../database/connection.js");

exports.selectStudents = (sort_by = "student_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "student_id",
      "student_firstname",
      "student_lastname",
      "student_email",
      "student_active",
      "student_grade",
      "student_targetgrade",
      "student_notes",
      "student_progressbar",
      "student_image",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  return db
    .query(`SELECT * FROM student ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      return result.rows;
    });
};

exports.selectStudentById = (student_id) => {
  let queryString = "SELECT * FROM student";
  const queryParams = [];
  if (student_id) {
    queryString += " where student_id=$1;";
    queryParams.push(student_id);
  }
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows[0];
  });
};

exports.insertStudent = (student) => {
  const {
    student_username,
    student_firstname,
    student_lastname,
    student_email,
    student_active,
    student_password,
    student_grade,
    student_targetgrade,
    student_notes,
    student_progressbar,
    student_image,
  } = student;

  return db
    .query(
      `INSERT INTO student (student_username,student_firstname, student_lastname, student_email, student_password, student_grade, student_active,student_targetgrade, student_notes, student_progressbar, student_image ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11  ) RETURNING *; `,
      [
        student_username,
        student_firstname,
        student_lastname,
        student_email,
        student_password,
        student_grade,
        student_active,
        student_targetgrade,
        student_notes,
        student_progressbar,
        student_image,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteStudentById = (student_id) => {
  return db
    .query("DELETE FROM student WHERE student_id = $1 RETURNING *", [
      student_id,
    ])
    .then((result) => {
      //console.log(result)
      return result.rows[0];
    });
};

exports.updateStudentById = (student, student_id) => {
  const {
    student_username,
    student_firstname,
    student_lastname,
    student_email,
    student_active,
    student_password,
    student_grade,
    student_targetgrade,
    student_notes,
    student_progressbar,
    student_image,
  } = student;
  return db
    .query(
      `UPDATE student SET student_username =$1, student_firstname = $2, student_lastname = $3, student_email= $4, student_password= $5, student_grade = $6, student_active= $7, student_targetgrade = $8, student_notes = $9, student_progressbar= $10, student_image=$11 WHERE student_id = $12 RETURNING *;`,
      [
        student_username,
        student_firstname,
        student_lastname,
        student_email,
        student_password,
        student_grade,
        student_active,
        student_targetgrade,
        student_notes,
        student_progressbar,
        student_image,
        student_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
