const db = require('../../configs/database/connection');
const { hashPassword } = require('../../helpers/passwordhelper');

exports.checkTutorExists = (tutor_id) => {
  return db
    .query(
      `SELECT * FROM tutor WHERE
    tutor_id=$1`,
      [tutor_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.selectTutors = async (sort_by = 'tutor_id') => {
  const InsertQuery =`SELECT * FROM tutor ORDER BY ${sort_by} ASC;`
  const data = await db.query(InsertQuery)
  return data.rows;
};

exports.selectTutorById = async (tutor_id) => {
  let queryString = 'SELECT * FROM tutor';
  const queryParams = [];
  if (tutor_id) {
    queryString += ' where tutor_id=$1;';
    queryParams.push(tutor_id);
  }
  const data =  await db.query(queryString, queryParams)
    return data.rows[0];

};

exports.insertTutor = async (tutor) => {
  const {
    tutor_username,
    tutor_firstname,
    tutor_lastname,
    tutor_email,
    tutor_active,
    tutor_image,
    tutor_password,
  } = tutor;

  const InsertQuery = `INSERT INTO tutor (tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_active, tutor_image, tutor_password) VALUES ($1, $2, $3, $4, $5, $6, $7  ) RETURNING *;`
  const hashedPassword = await hashPassword(tutor_password, 10);
  const data= await db.query(InsertQuery,[
    tutor_username,
    tutor_firstname,
    tutor_lastname,
    tutor_email,
    tutor_active,
    tutor_image,
    hashedPassword,
  ])
  return data.rows[0];
};

exports.deleteTutorById = async (tutor_id) => {
  const InsertQuery = 'DELETE FROM tutor WHERE tutor_id = $1 RETURNING *'
  const data = await db.query(InsertQuery, [tutor_id])
      return data.rows[0];
};

exports.updateTutorById = async (tutor, tutor_id) => {
  const {
    tutor_username,
    tutor_firstname,
    tutor_lastname,
    tutor_email,
    tutor_active,
    tutor_image,
    tutor_password,
  } = tutor;
  const InsertQuery = `UPDATE tutor SET  tutor_username=$1, tutor_firstname = $2, tutor_lastname = $3, tutor_email= $4, tutor_active= $5, tutor_image = $6, tutor_password= $7 WHERE tutor_id = $8 RETURNING *;`
  const hashedPassword = await hashPassword(tutor_password, 10);
  const data = await  db.query(InsertQuery,[
    tutor_username,
    tutor_firstname,
    tutor_lastname,
    tutor_email,
    tutor_active,
    tutor_image,
    hashedPassword,
    tutor_id,
  ])
  
  return data.rows[0];
};