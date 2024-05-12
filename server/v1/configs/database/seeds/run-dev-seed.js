const seed = require ('./seed');
const db = require("../connection");
const devData = require('../data/dev-data');

const runSeed = () => {
    return seed(devData).then(() => db.end());
}

runSeed();
