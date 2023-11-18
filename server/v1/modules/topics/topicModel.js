const db = require('../../configs/database/connection');

exports.checkTopicExists = (topic_id) => {
  return db
    .query(
      `SELECT * FROM topic WHERE
    topic_id=$1`,
      [topic_id]
    )
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.selectTopics = async (sort_by = 'topic_unit') => {
  // custom error handling
  if (sort_by) {
    const allowedSortBys = [
      'topic_id',
      'topic_unit',
      'topic_code',
      'topic_name',
      'topic_level',
      'topic_course_fk_id',
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, message: 'bad request' });
    }
  }
  const InsertQuery =`SELECT * FROM topic ORDER BY ${sort_by} ASC;`
  const data = await db.query(InsertQuery)
      return data.rows;
};

exports.insertTopic = async (topic) => {
  
  const { topic_unit, topic_name, topic_code, topic_desc, topic_level, topic_course_fk_id } = topic;
    const InsertQuery =`INSERT INTO topic
    (topic_unit, topic_name, topic_code, topic_desc, topic_level,  topic_course_fk_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
  const data =  await db.query(InsertQuery, [topic_unit,topic_name, topic_code, topic_desc, topic_level, topic_course_fk_id]
    )
      return data.rows[0];
};

exports.selectTopicById =  async (topic_id) => {
  const InsertQuery = 'SELECT * FROM topic where topic_id =$1;'
  const data = await db.query(InsertQuery, [topic_id])
      return data.rows[0];
};

exports.deleteTopicById = async (topic_id) => {
  const InsertQuery= 'DELETE FROM topic WHERE topic_id = $1 RETURNING *'
  const data = await db.query(InsertQuery, [topic_id])
      return data.rows[0];
};

exports.updateTopicById = async (topic, topic_id) => {
  
  const { topic_unit, topic_name, topic_code, topic_desc, topic_level, topic_course_fk_id } = topic;
    const InsertQuery =`UPDATE topic SET topic_unit = $1, topic_name = $2, topic_code = $3, topic_desc = $4, topic_level = $5, topic_course_fk_id= $6 WHERE topic_id = $7 RETURNING *;`
  const data = await db.query(InsertQuery,[
        topic_unit,
        topic_name,
        topic_code,
        topic_desc,
        topic_level,
        topic_course_fk_id,
        topic_id,
      ]
    )
      return data.rows[0];
};
