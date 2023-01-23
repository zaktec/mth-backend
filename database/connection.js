const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const ENV = process.env.NODE_ENV  ||  "development";
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

//console.log (ENV)

require('dotenv').config({
 path: pathToCorrectEnvFile,
});

const dbConnection = new Pool();

//console.log(">>>>>>",process.env.PGDATABASE)

if (!process.env.PGDATABASE){
    throw new Error ("No PGDATABSE configured");
}


module.exports = dbConnection 