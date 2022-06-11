const db = require("../database/index.js")


exports.selectTopics = () => {
return db.query("SELECT * FROM topic;").then((result) => {
  
   return result.rows;

});


};

exports.selectTopicById = () => {};

exports.insertTopic = () => {};

exports.deleteTopicById= () => {};

exports.updateTopicsById  = () => {}; 