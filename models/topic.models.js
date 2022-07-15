const db = require("../database/connection.js");

exports.selectTopics = (sort_by = "topic_index") => {
  console.log(sort_by);
  // custom error handling
  if (sort_by){
  const allowedSortBys = [
    "topic_id",
    "topic_index",
    "topic_code",
    "topic_created_at",
  ];
  if (!allowedSortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
}

  return db
    .query(`SELECT * FROM topic ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      return result.rows;
    });
};

exports.insertTopic = (topic) => {
  //console.log(topic)
  const {
    topic_name,
    topic_code,
    topic_desc,
    topic_index,
    topic_created_at,
    topic_course_id,
  } = topic;
  return db
    .query(
      `INSERT INTO topic
  (topic_name, topic_code, topic_desc, topic_index,  topic_created_at, topic_course_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [
        topic_name,
        topic_code,
        topic_desc,
        topic_index,
        topic_created_at,
        topic_course_id,
      ]
    )
    .then(({ rows }) => {
      //console.log(rows);
      return rows[0];
    });
};

exports.selectTopicById = (topic_id) => {
  //console.log(topic_id)
  return db
  .query("SELECT * FROM topic where topic_id =$1;", [topic_id])
  .then(({ rows }) => {
   // console.log(rows)
  return rows[0];
});
}

exports.deleteTopicById= (topic_id) => {
  return db
    .query('DELETE FROM topic WHERE topic_id = $1 RETURNING *', [
      topic_id,
    ])
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateTopicsById = () => {};
