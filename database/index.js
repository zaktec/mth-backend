const { Pool, Client } = require('pg')

const db = new Pool();

db.query(`SELECT NOW()`, (err,res) => {
    console.log(err, res);
});
