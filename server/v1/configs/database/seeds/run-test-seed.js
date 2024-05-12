const seed = require ('./seed');
const db = require("../connection");
const testData = require("../data/test-data");

const runSeed = () => {
    return seed(testData).then(() => db.end());
}

runSeed();
