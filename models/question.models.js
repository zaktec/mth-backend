const db = require("../database/connection.js");

exports.selectQuestions = (sort_by = "ques_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "ques_id",
      "ques_grade",
      "ques_lesson_id",
      "ques_quiz_code",
      "ques_calc",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }

  return db
    .query(`SELECT * FROM question ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      // console.log(result.rows)
      return result.rows;
    });
};

exports.selectQuestionById = (ques_id) => {
  let queryString = "SELECT * FROM question";
  const queryParams = [];
  if (ques_id) {
    queryString += " where ques_id =$1;";
    queryParams.push(ques_id);
  }
  //console.log(queryString, queryParams);
  return db.query(queryString, queryParams).then(({ rows }) => {
    //console.log(rows);
    return rows[0];
  });
};

exports.insertQuestion = (question) => {
  const {
    ques_body,
    ques_image,
    ques_grade,
    ques_calc,
    ques_mark,
    ques1_ans,
    ques2_ans,
    ques3_ans,
    ques_ans_explain,
    ques_ans_mark,
    ques_ans_image,
    ques_ans_correct,
    ques_ans_sym_b,
    ques_ans_sym_a,
    ques_quiz_id,
    ques_lesson_id,
  } = question;

  return db
    .query(
      `INSERT INTO question (ques_body, ques_image,ques_grade, ques_calc, ques_mark,ques1_ans,ques2_ans, ques3_ans, ques_ans_explain, ques_ans_mark,ques_ans_image, ques_ans_correct, ques_ans_sym_b, ques_ans_sym_a, ques_quiz_id,ques_lesson_id) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10 ,$11, $12, $13, $14, $15,$16) RETURNING *; `,
      [
        ques_body,
        ques_image,
        ques_grade,
        ques_calc,
        ques_mark,
        ques1_ans,
        ques2_ans,
        ques3_ans,
        ques_ans_explain,
        ques_ans_mark,
        ques_ans_image,
        ques_ans_correct,
        ques_ans_sym_b,
        ques_ans_sym_a,
        ques_quiz_id,
        ques_lesson_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteQuestionById = (ques_id) => {
  return db
  .query("DELETE FROM question WHERE ques_id = $1 RETURNING *", [ques_id])
  .then((result) => {
    return result.rows[0];
  });

};

exports.updateQuestionById = (question, ques_id) => {
  const {
    ques_body,
    ques_image,
    ques_grade,
    ques_calc,
    ques_mark,
    ques1_ans,
    ques2_ans,
    ques3_ans,
    ques_ans_explain,
    ques_ans_mark,
    ques_ans_image,
    ques_ans_correct,
    ques_ans_sym_b,
    ques_ans_sym_a,
    ques_quiz_id,
    ques_lesson_id,
  } = question;
  return db
    .query(
      `UPDATE question SET ques_body = $1, ques_image = $2,  ques_grade = $3, ques_calc = $4, ques_mark = $5, ques1_ans = $6, ques2_ans = $7, ques3_ans = $8,  ques_ans_explain= $9, ques_ans_mark= $10, ques_ans_image=$11, ques_ans_correct = $12, ques_ans_sym_b = $13, ques_ans_sym_a = $14, ques_quiz_id = $15, ques_lesson_id=$16 WHERE ques_id = $17 RETURNING *;`,
      [
        ques_body,
        ques_image,
        ques_grade,
        ques_calc,
        ques_mark,
        ques1_ans,
        ques2_ans,
        ques3_ans,
        ques_ans_explain,
        ques_ans_mark,
        ques_ans_image,
        ques_ans_correct,
        ques_ans_sym_b,
        ques_ans_sym_a,
        ques_quiz_id,
        ques_lesson_id,
        ques_id,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
