const db = require("../database/connection.js");


exports.checkUser = (username= "username", password) => {
  console.log(username, password);

  return db.query(`SELECT * FROM student WHERE student_username = $1;`, [username]).then(({ rows }) => {
    
    return rows[0];
  });
};
