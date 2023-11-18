const db = require('../../configs/database/connection');
const { hashPassword } = require('../../helpers/passwordhelper');


exports.checkAdminExist = (admin_id) => {
  return db
    .query(
      `SELECT * FROM admin WHERE 
    admin_id=$1`,
      [admin_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.selectAdmin = async (sort_by = 'admin_id') => {
  if (sort_by) {
    const allowedSortBys = [
      'admin_id',
      'admin_username',
      'admin_firstname',
      'admin_lastname',
      'admin_email',
      'admin_active',
      'admin_image',
    ];
   if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, message: 'bad request' });
    }
  }
  const InsertQuery = `SELECT * FROM admin ORDER BY ${sort_by} ASC`;
  const data = await db.query(InsertQuery);
  return data.rows;
};

exports.selectAdminById = async (admin_id) => {
  let queryString = 'SELECT * FROM admin';
  const queryParams = [];
  if (admin_id) {
    queryString += ' where admin_id=$1;';
    queryParams.push(admin_id);
  }
  const data = await db.query(queryString, queryParams);
  return data.rows[0];
};

exports.insertAdmin = async (admin) => {
  const {
    admin_username,
    admin_firstname,
    admin_lastname,
    admin_email,
    admin_active,
    admin_image,
    admin_password,
  } = admin;
  const InsertQuery = 'INSERT INTO admin (admin_username, admin_firstname, admin_lastname, admin_email, admin_active, admin_image, admin_password) VALUES ($1, $2, $3, $4, $5, $6, $7  ) RETURNING *;';
  const hashedPassword = await hashPassword(admin_password, 10);
  const data = await db.query(InsertQuery, [
    admin_username,
    admin_firstname,
    admin_lastname,
    admin_email,
    admin_active,
    admin_image,
    hashedPassword,
  ]);

  return data.rows[0];
};

exports.deleteAdminById = async (admin_id) => {
  const InsertQuery = 'DELETE FROM admin WHERE  admin_id = $1 RETURNING *';
  const data = await db.query(InsertQuery, [admin_id]);
  return data.rows[0];
};

exports.updateAdminById = async (admin, admin_id) => {
  const {
    admin_username,
    admin_firstname,
    admin_lastname,
    admin_email,
    admin_active,
    admin_image,
    admin_password,
  } = admin;
  const InsertQuery = `UPDATE admin SET  admin_username=$1, admin_firstname = $2, admin_lastname = $3, admin_email= $4, admin_active= $5, admin_image = $6, admin_password= $7 WHERE admin_id = $8 RETURNING *;`;
  const hashedPassword = await hashPassword(admin_password, 10);
  const data = await db.query(InsertQuery, [
    admin_username,
    admin_firstname,
    admin_lastname,
    admin_email,
    admin_active,
    admin_image,
    hashedPassword,
    admin_id,
  ]);
  return data.rows[0];
};

exports.selectResit = async () => {
  const result = await db.query(`psql -f database/setup-dbs.sql > example.txt`);
  return result.rows;
};