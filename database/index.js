const { Pool, Client } = require('pg')

const db = new Pool();

db.query(`SELECT NOW()`, (err,res) => {
    console.log(err, res);
});

db.query(`SELECT * FROM users;`, (err,result) => {
    console.log(result);
});