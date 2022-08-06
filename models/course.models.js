const db = require("../database/connection.js");

exports.selectCourses = (sort_by = "course_id") => {
  if (sort_by) {
    const allowedSortBys = ["course_id", "course_code", "course_name"];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  return db
    .query(`SELECT * FROM course ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      //console.log(result)
      return result.rows;
    });
};

exports.selectCourseById = (course_id) => {
  let queryString = "SELECT * FROM course";
  const queryParams = [];
  if (course_id) {
    queryString += " where course_id =$1;";
    queryParams.push(course_id);
  }
  //console.log(queryString, queryParams);
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows[0];
  });
};

exports.insertCourse = (course) => {
  const {
    course_code,
    course_desc,
    course_image,
    course_level,
    course_name,
  } = course;

  return db
    .query(
      `INSERT INTO course (course_code, course_desc,
    course_image, course_level, course_name) VALUES ($1, $2, $3, $4, $5) RETURNING *; `,
      [
        course_code,
        course_desc,
        course_image,
        course_level,
        course_name,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteCourseById = (course_id) => {
  return db
    .query("DELETE FROM course WHERE course_id = $1 RETURNING *", [course_id])
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateCourseById = (course, course_id) => {
  //console.log('votes and article_id', votes, article_id);
  const {
    course_code,
    course_desc,
    course_image,
    course_level,
    course_name,
  } = course;
  return db
    .query(
      `UPDATE course SET course_code = $1, course_desc = $2, course_image = $3, course_level = $4, course_name = $5 WHERE course_id = $6 RETURNING *;`,
      [
        course_code,
        course_desc,
        course_image,
        course_level,
        course_name,
        course_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
