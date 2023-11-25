const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();

const pathToCorrectEnvFile = `${__dirname}/../.env.${ process.env.NODE_ENV  ||  'development' }`;
require('dotenv').config({ path: pathToCorrectEnvFile });
const dbConnection = new Pool();

if (!process.env.PGDATABASE) {
    throw new Error ('No PGDATABSE configured');
}

module.exports = dbConnection