const db = require("../../database/connection.js");

exports.selectLessons = async (sort_by = "lesson_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "lesson_id",
      "lesson_code",
      "lesson_name",
      "lesson_topic_fk_id",
    ];
    console.log(sort_by)
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  const InsertQuery = `SELECT * FROM lesson ORDER BY ${sort_by} ASC;`
const data = await  db.query(InsertQuery)
      return data.rows;
};

exports.selectLessonById = async (lesson_id) => {
  let queryString = "SELECT * FROM lesson";
  const queryParams = [];
  if (lesson_id) {
    queryString += " where lesson_id =$1;";
    queryParams.push(lesson_id);
  }
  
  const data = await  db.query(queryString, queryParams);
    return data.rows[0];

};

exports.insertLesson = async (lesson) => {
  const {
    lesson_topic,
    lesson_name,
    lesson_code,
    lesson_desc,
    lesson_grade,
    lesson_body,
    lesson_topic_fk_id,
  } = lesson;

  const InsertQuery = `INSERT INTO lesson (lesson_topic,lesson_name, lesson_code, lesson_desc, lesson_grade, lesson_body, lesson_topic_fk_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *; `
  const data = await db.query(InsertQuery,[
        lesson_topic,
        lesson_name,
        lesson_code,
        lesson_desc,
        lesson_grade,
        lesson_body,
        lesson_topic_fk_id,
      ]
    )
      return data.rows[0];
};

exports.deleteLessonById = async (lesson_id) => {
  const InsertQuery = "DELETE FROM lesson WHERE lesson_id = $1 RETURNING *"
  
  const data = await db.query( InsertQuery, [lesson_id])
      return data.rows[0];
};

exports.updateLessonById = async (lesson, lesson_id) => {
  const {
    lesson_topic,
    lesson_name,
    lesson_code,
    lesson_desc,
    lesson_grade,
    lesson_body,
    lesson_topic_fk_id,
  } = lesson;
  const InsertQuery = `UPDATE lesson SET lesson_topic = $1, lesson_name = $2, lesson_code = $3, lesson_desc = $4, lesson_grade = $5, lesson_body = $6, lesson_topic_fk_id = $7 WHERE lesson_id = $8 RETURNING *;`
  const data= await db.query( InsertQuery,[
        lesson_topic,
        lesson_name,
        lesson_code,
        lesson_desc,
        lesson_grade,
        lesson_body,
        lesson_topic_fk_id,
        lesson_id,
      ]);
      return data.rows[0];
};
