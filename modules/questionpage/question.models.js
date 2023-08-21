const db = require("../../database/connection.js");

exports.selectQuestions = async (sort_by = "question_id") => {
  if (sort_by) {
    const allowedSortBys = [
      "question_id",
      "question_grade",
      "question_quiz_fk_id",
      "question_calc",
    ];
    if (!allowedSortBys.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
  }
  const InsertQuery = `SELECT * FROM question ORDER BY ${sort_by} ASC;`;
  const data = await db.query(InsertQuery);
  return data.rows;
};

exports.selectQuestionById = async (question_id) => {
  console.log(question_id)
  let queryString = "SELECT * FROM question";
  const queryParams = [];
  if (question_id) {
    queryString += " where question_id =$1;";
    queryParams.push(question_id);
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
    question_quiz_fk_id
  } = question;
    console.log("test>>>>>",question)
  const InsertQuery = `INSERT INTO question (question_body, question_ans1, question_ans2, question_ans3, question_image, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination,question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback, question_quiz_fk_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,  $20, $21) RETURNING *;`
    console.log("test>>>>>",InsertQuery)
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
    question_quiz_fk_id
  ]);
  console.log("test>>>>>",data.rows)
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
  const InsertQuery = `UPDATE question SET question_body = $1, question_body = $2, question_ans1 = $3, question_ans2 = $4, question_ans3 = $5,  question_image = $6, question_mark = $7, question_grade = $8, question_type = $9, question_calc = $10, question_ans_sym_b = $11, question_ans_sym_a = $12, question_correct= $13, question_explanation= $14, question_ans_mark= $15, question_ans_image=$16, question_response1 = $17, question_response2 = $18, question_response3 = $19,  ques_ans_explain= $9,   ques_ans_correct = $12, , ques_quiz_id = $15, ques_lesson_id=$16 WHERE ques_id = $17 RETURNING *;`;
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
