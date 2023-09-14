/* const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const dbconfig = {
    idleTimeoutMillis: 60000,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
};


const dbConnection = new Pool(dbconfig);

dbConnection.on('error', (error, client) => {
    console.error('Something wrong occured', error)
});

dbConnection.connect(() => {
    console.log('DB connection success !!');
});

module.exports = dbConnection; */



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