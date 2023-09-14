const { Pool } = require('pg');
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

module.exports = dbConnection;
