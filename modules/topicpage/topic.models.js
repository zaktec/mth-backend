const db = require("../../database/connection.js");

exports.selectTopics = async (sort_by = "topic_index") => {
  // custom error handling
  if (sort_by) {
    const allowedSortBys = [
      "topic_id",
      "topic_index",
      "topic_code",
      "topic_name",
      "topic_course_id",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  const InsertQuery =`SELECT * FROM topic ORDER BY ${sort_by} ASC;`
  const data = await db.query(InsertQuery)
      return data.rows;
};

exports.insertTopic = async (topic) => {
  
  const { topic_name, topic_code, topic_desc, topic_index, topic_course_id } = topic;
    const InsertQuery =`INSERT INTO topic
    (topic_name, topic_code, topic_desc, topic_index,  topic_course_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  const data =  await db.query(InsertQuery, [topic_name, topic_code, topic_desc, topic_index, topic_course_id]
    )
      return data.rows[0];
};

exports.selectTopicById =  async (topic_id) => {
  //console.log(topic_id)
  const InsertQuery = "SELECT * FROM topic where topic_id =$1;"
  const data = await db.query(InsertQuery, [topic_id])
      return data.rows[0];
};

exports.deleteTopicById = async (topic_id) => {
  const InsertQuery= "DELETE FROM topic WHERE topic_id = $1 RETURNING *"
  const data = await db.query(InsertQuery, [topic_id])
      return data.rows[0];
};

exports.deleteCourseById = async (course_id) => {
  const InsertQuery= "DELETE FROM course WHERE course_id = $1 RETURNING *";
  const data = await db.query(InsertQuery, [course_id])
      return data.rows[0];

};

exports.updateTopicById = async (topic, topic_id) => {
  
  const { topic_name, topic_code, topic_desc, topic_index, topic_course_id } = topic;
    const InsertQuery =`UPDATE topic SET topic_name = $1, topic_code = $2, topic_desc = $3, topic_index = $4, topic_course_id= $5 WHERE topic_id = $6 RETURNING *;`
  const data = await db.query(InsertQuery,[
        topic_name,
        topic_code,
        topic_desc,
        topic_index,
        topic_course_id,
        topic_id,
      ]
    )
      return data.rows[0];
};
