const db = require("../../database/connection.js");
exports.selectResit = async () => {
  const result = await db.query(`psql -f database/setup-dbs.sql > example.txt`);
  return result.rows;
};
