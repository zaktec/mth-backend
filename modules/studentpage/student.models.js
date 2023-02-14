const db = require("../../database/connection.js");

exports.selectStudents = async (sort_by = "student_id") => {
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
  const InsertQuery =`SELECT * FROM student ORDER BY ${sort_by} ASC;`
  const data = await db.query(InsertQuery)
      return data.rows;
};

exports.selectStudentById = async (student_id) => {
  let queryString = "SELECT * FROM student";
  const queryParams = [];
  if (student_id) {
    queryString += " where student_id=$1;";
    queryParams.push(student_id);
  }
  const data = await db.query(queryString, queryParams)
    return data.rows[0];
};

exports.insertStudent = async (student) => {
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
    student_tutor_id,
  } = student;

  const InsertQuery = `INSERT INTO student (student_username,student_firstname, student_lastname, student_email, student_password, student_grade, student_active,student_targetgrade, student_notes, student_progressbar, student_image, student_tutor_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12) RETURNING *;`
  const data = await db.query(InsertQuery,[
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
        student_tutor_id,
      ]);
      return data.rows[0];
};

exports.deleteStudentById = async (student_id) => {
  const InsertQuery = "DELETE FROM student WHERE student_id = $1 RETURNING *"
  const data = await db.query(InsertQuery, [student_id,])
      return data.rows[0];
};

exports.updateStudentById = async (student, student_id) => {
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
  const InsertQuery = `UPDATE student SET student_username =$1, student_firstname = $2, student_lastname = $3, student_email= $4, student_password= $5, student_grade = $6, student_active= $7, student_targetgrade = $8, student_notes = $9, student_progressbar= $10, student_image=$11 WHERE student_id = $12 RETURNING *;`
  const data = await db.query(InsertQuery,[
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
      ])
      return data.rows[0];
};
