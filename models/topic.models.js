const db = require("../database/connection.js")


exports.selectTopics = () => {
return db.query("SELECT * FROM topic;").then((result) => {
  
   return result.rows;

});


};

exports.selectTopicById = () => {};

exports.insertTopic = () => {};

exports.deleteTopicById= () => {};

exports.updateTopicsById  = () => {}; 