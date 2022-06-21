const { Pool, Client } = require('pg')
const ENV = process.env.NODE_ENV  ||  "development";
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;


require('dotenv').config({
 path: pathToCorrectEnvFile,
});

const dbConnection = new Pool();



if (!process.env.PGDATABASE){
    throw new Error ("No PGDATABSE configured");
}


module.exports = dbConnection 