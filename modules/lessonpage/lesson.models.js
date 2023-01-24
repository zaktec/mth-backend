const db = require("../../database/connection.js");

exports.selectLessons = (sort_by = "lesson_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "lesson_id",
      "lesson_code",
      "lesson_name",
      "lesson_topic_id",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  return db
    .query(`SELECT * FROM lesson ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      return result.rows;
    });
};

exports.selectLessonById = (lesson_id) => {
  let queryString = "SELECT * FROM lesson";
  const queryParams = [];
  if (lesson_id) {
    queryString += " where lesson_id =$1;";
    queryParams.push(lesson_id);
  }
  //console.log(queryString, queryParams);
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows[0];
  });
};

exports.insertLesson = (lesson) => {
  const {
    lesson_name,
    lesson_code,
    lesson_desc,
    lesson_ws,
    lesson_body,
    lesson_topic_id,
  } = lesson;

  return db
    .query(
      `INSERT INTO lesson (lesson_name, lesson_code,
      lesson_desc, lesson_ws, lesson_body, lesson_topic_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *; `,
      [
        lesson_name,
        lesson_code,
        lesson_desc,
        lesson_ws,
        lesson_body,
        lesson_topic_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteLessonById = (lesson_id) => {
  return db
    .query("DELETE FROM lesson WHERE lesson_id = $1 RETURNING *", [lesson_id])
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateLessonById = (lesson, lesson_id) => {
  const {
    lesson_name,
    lesson_code,
    lesson_desc,
    lesson_ws,
    lesson_body,
    lesson_topic_id,
  } = lesson;
  return db
    .query(
      `UPDATE lesson SET lesson_name = $1, lesson_code = $2, lesson_desc = $3, lesson_ws = $4, lesson_body = $5, lesson_topic_id = $6 WHERE lesson_id = $7 RETURNING *;`,
      [
        lesson_name,
        lesson_code,
        lesson_desc,
        lesson_ws,
        lesson_body,
        lesson_topic_id,
        lesson_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
