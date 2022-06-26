const db = require("../database/connection.js");

exports.selectTopics = (sort_by = "topic_index") => {
  console.log(sort_by);
  // custom error handling
  const allowedSortBys = [
    "topic_id",
    "topic_index",
    "topic_code",
    "topic_date",
  ];
  if (!allowedSortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  return db
    .query(`SELECT * FROM topic ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      return result.rows;
    });
};

exports.selectTopicById = () => {};

exports.insertTopic = () => {};

exports.deleteTopicById = () => {};

exports.updateTopicsById = () => {};
