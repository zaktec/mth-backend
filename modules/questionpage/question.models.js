const db = require("../../database/connection.js");

exports.selectQuestions = async (sort_by = "ques_id") => {
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
  const InsertQuery = `SELECT * FROM question ORDER BY ${sort_by} ASC;`;
  const data = await db.query(InsertQuery);
  return data.rows;
};

exports.selectQuestionById = async (ques_id) => {
  let queryString = "SELECT * FROM question";
  const queryParams = [];
  if (ques_id) {
    queryString += " where ques_id =$1;";
    queryParams.push(ques_id);
  }

  const data = await db.query(queryString, queryParams);
  return data.rows[0];
};

exports.insertQuestion = async (question) => {
  const {
    question_body,
    question_ans1,
    question_ans2,
    question_ans3,
    question_image,
    question_mark,
    question_grade,
    question_type,
    question_calc,
    question_ans_sym_b,
    question_ans_sym_a,
    question_correct,
    question_explaination,
    question_ans_mark,
    question_ans_image,
    question_response1,
    question_response2,
    question_response3,
    question_workingout,
    question_feedback,
    question_quiz_fk_id,
  } = question;

  const InsertQuery = `INSERT INTO question (question_body, question_ans1, question_ans2, question_ans3, question_image, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination, 
    question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback,question_quiz_fk_id) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10 ,$11, $12, $13, $14, $15, $16 $17, $18, $19, $20 ,$21) RETURNING *;`;
  const data = await db.query(InsertQuery, [
    question_body,
    question_ans1,
    question_ans2,
    question_ans3,
    question_image,
    question_mark,
    question_grade,
    question_type,
    question_calc,
    question_ans_sym_b,
    question_ans_sym_a,
    question_correct,
    question_explaination,
    question_ans_mark,
    question_ans_image,
    question_response1,
    question_response2,
    question_response3,
    question_workingout,
    question_feedback,
    question_quiz_fk_id,
  ]);
  return data.rows[0];
};

exports.deleteQuestionById = async (ques_id) => {
  const InsertQuery = "DELETE FROM question WHERE ques_id = $1 RETURNING *";
  const data = await db.query(InsertQuery, [ques_id]);
  return data.rows[0];
};

exports.updateQuestionById = async (question, ques_id) => {
  const {
    question_body,
    question_ans1,
    question_ans2,
    question_ans3,
    question_image,
    question_mark,
    question_grade,
    question_type,
    question_calc,
    question_ans_sym_b,
    question_ans_sym_a,
    question_correct,
    question_explaination,
    question_ans_mark,
    question_ans_image,
    question_response1,
    question_response2,
    question_response3,
    question_workingout,
    question_feedback,
    question_quiz_fk_id,
  } = question;
  const InsertQuery = `UPDATE question SET ques_body = $1, ques_image = $2,  ques_grade = $3, ques_calc = $4, ques_mark = $5, ques1_ans = $6, ques2_ans = $7, ques3_ans = $8,  ques_ans_explain= $9, ques_ans_mark= $10, ques_ans_image=$11, ques_ans_correct = $12, ques_ans_sym_b = $13, ques_ans_sym_a = $14, ques_quiz_id = $15, ques_lesson_id=$16 WHERE ques_id = $17 RETURNING *;`;
  const data = await db.query(InsertQuery, [
    question_body,
    question_ans1,
    question_ans2,
    question_ans3,
    question_image,
    question_mark,
    question_grade,
    question_type,
    question_calc,
    question_ans_sym_b,
    question_ans_sym_a,
    question_correct,
    question_explaination,
    question_ans_mark,
    question_ans_image,
    question_response1,
    question_response2,
    question_response3,
    question_workingout,
    question_feedback,
    question_quiz_fk_id,
    ques_id,
  ]);
  return data.rows[0];
};
