const db = require("../../database/connection.js");

exports.selectCourses = async (sort_by = "course_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "course_id",
      "course_code",
      "course_name",
      "course_level",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
 
  const GetQuery = `SELECT * FROM course ORDER BY ${sort_by} ASC;`;
  const data = await db.query(GetQuery)
      return data.rows;
};

exports.selectCourseById =  async (course_id) => {
  let queryString = "SELECT * FROM course";
  const queryParams = [];
  if (course_id) {
    queryString += " where course_id =$1;";
    queryParams.push(course_id);
  }
  const data = await  db.query(queryString, queryParams);
    return data.rows[0];
};

exports.insertCourse =  async (course) => {
  const { course_code, course_desc, course_image, course_level, course_name } =
    course;
const InsertQuery =  `INSERT INTO course (course_code, course_desc,course_image, course_level, course_name) VALUES ($1, $2, $3, $4, $5) RETURNING *; `;
const data = await db.query(InsertQuery,[course_code, course_desc, course_image, course_level, course_name])
      return data.rows[0];
};

exports.deleteCourseById = async (course_id) => {

    const InsertQuery ="DELETE FROM course WHERE course_id = $1 RETURNING *";
  const data =   await db.query(InsertQuery, [course_id])
      return data.rows[0];
};

exports.updateCourseById = async (course, course_id) => {

  const { course_code, course_desc, course_image, course_level, course_name } =
    course;

    const InsertQuery =  `UPDATE course SET course_code = $1, course_desc = $2, course_image = $3, course_level = $4, course_name = $5 WHERE course_id = $6 RETURNING *;`
   const data= await db.query(InsertQuery,[
        course_code,
        course_desc,
        course_image,
        course_level,
        course_name,
        course_id,
      ]
    )
      return data.rows[0];
};
