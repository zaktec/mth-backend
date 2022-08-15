const db = require("../database/connection.js")


exports.selectQuestions = (sort_by = "ques_id") => {
   
   if (sort_by) {
      const allowedSortBys = ["ques_id", "ques_grade", "ques_lesson_id", "ques_quiz_code", "ques_calc"];
      if (!allowedSortBys.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: "bad request" });
      }
    }
 
    return db
      .query(`SELECT * FROM question ORDER BY ${sort_by} ASC;`)
      .then((result) => {
       // console.log(result)
        return result.rows;
      });

}


exports.selectQuestionById = (ques_id) => {
  let queryString = "SELECT * FROM question";
  const queryParams = [];
  if (ques_id) {
    queryString += " where question_id =$1;";
    queryParams.push(ques_id);
  }
  //console.log(queryString, queryParams);
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows[0];
  });

};

exports.insertUser = () => {};

exports.deleteUserById= () => {};

exports.updateUserById  = () => {}; 