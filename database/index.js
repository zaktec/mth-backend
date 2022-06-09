const { Pool, Client } = require('pg')

const dbConnection = new Pool();

if (!process.env.PGDATABASE){
    throw new Error ("No PGDATABSE configured");
}

dbConnection.query(`SELECT NOW()`, (err,res) => {
    console.log(err, res);
});

dbConnection.query(`SELECT * FROM course;`, (err,result) => {
    console.log(result.rows);
});

module.exports = dbConnection 