const seed = require ('./seed.js')
const testData = require("../data/test-data");
const db = require("../connection")


const runSeed = () => {

    return seed(testData).then(() => db.end());
}
 runSeed();