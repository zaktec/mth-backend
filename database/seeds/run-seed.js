const seed = require ('./seed.js')
const devData =require('../data/dev-data')
const db = require("../connection")

const runSeed = () => {
    return seed(devData).then(() => {
        db.end();
        process.exit();
    });
}

runSeed();