const db = require("../connection.js");
//const { topicData, courseData } = require("../data/test-data/index.js")
const format = require("pg-format");
const {
  formatCourseData,
  formatTopicData,
  formatStudentData,
  formatTutorData,
  formatLessonData,
  formatQuizData,
  formatQuestionData,
  formatAdminsData
} = require("../../utils/seed-formatting.js");

const seed = (data) => {
  const {
    courseData,
    topicData,
    studentData,
    tutorData,
    lessonData,
    quizData,
    questionData,
    adminsData
  } = data;
  //console.log(studentData);

  // drop everything
  return db
    .query(`DROP TABLE IF EXISTS question;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS quizfb;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS digitutor;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS auth;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS quiz;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS lesson;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS student;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS tutor;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS admins;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topic;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS course;`);
    })

    .then(() => {
      //console.log(result)

      // create tables
      return db.query(` CREATE TABLE course (
          course_id SERIAL PRIMARY KEY,
          course_name VARCHAR(200) NOT NULL,
          course_code VARCHAR(200) NOT NULL,
          course_desc VARCHAR(200) NOT NULL,
          course_level VARCHAR(100) NOT NULL,
          course_image VARCHAR(200) NOT NULL   
       );
       `);
    })
    .then(() => {
      return db.query(` CREATE TABLE topic (
          topic_id SERIAL PRIMARY KEY,
            topic_name VARCHAR(200) NOT NULL,
            topic_code VARCHAR(200) NOT NULL,
            topic_desc VARCHAR(200) NOT NULL,
            topic_index INT,
            topic_course_id INT REFERENCES course(course_id) ON DELETE CASCADE
       );
       `);
    })
    .then(() => {
      return db.query(` CREATE TABLE admins (
        admins_id SERIAL PRIMARY KEY,
        admins_username VARCHAR(200) NOT NULL UNIQUE,
        admins_firstname VARCHAR(200) NOT NULL,
        admins_lastname VARCHAR(200),
        admins_email VARCHAR(200) NOT NULL,
        admins_password VARCHAR(100) NOT NULL,
        admins_active BOOLEAN,
        admins_image VARCHAR(200)
        );
        `);
    })
    .then(() => {
      return db.query(` CREATE TABLE tutor (
        tutor_id SERIAL PRIMARY KEY,
        tutor_username VARCHAR(200) NOT NULL UNIQUE,
        tutor_firstname VARCHAR(200) NOT NULL,
        tutor_lastname VARCHAR(200),
        tutor_email VARCHAR(200) NOT NULL,
        tutor_password VARCHAR(100) NOT NULL,
        tutor_active BOOLEAN,
        tutor_image VARCHAR(200)
        );
        `);
    })
    .then(() => {
      return db.query(`CREATE TABLE student (
        student_id SERIAL PRIMARY KEY,
        student_username VARCHAR(200) NOT NULL UNIQUE,
          student_firstname VARCHAR(200) NOT NULL,
          student_lastname VARCHAR(200) NOT NULL,
          student_email VARCHAR(200) NOT NULL,
          student_password VARCHAR(200) NOT NULL,
          student_active BOOLEAN DEFAULT TRUE,
          student_grade INT DEFAULT 0,
          student_targetgrade INT DEFAULT 0,
          student_notes VARCHAR(500),
          student_progressbar INT DEFAULT 0,
          student_image VARCHAR(200)
          );
        `);
    })
    .then(() => {
      return db.query(`CREATE TABLE lesson (
        lesson_id SERIAL PRIMARY KEY,
          lesson_name VARCHAR(200) NOT NULL,
          lesson_code VARCHAR(200),
          lesson_desc VARCHAR(200) NOT NULL,
          lesson_ws VARCHAR(200) NOT NULL,
          lesson_body VARCHAR(200),
          lesson_topic_id INT REFERENCES topic(topic_id) ON DELETE CASCADE
          );
        `);
    })
    .then(() => {
      return db.query(`CREATE TABLE quiz (
        quiz_id SERIAL PRIMARY KEY,
          quiz_name VARCHAR(200) NOT NULL,
          quiz_code VARCHAR(200),
          quiz_type VARCHAR(200) NOT NULL
          );
        `);
    })
    .then(() => {
      return db.query(`CREATE TABLE auth (
        auth_id SERIAL PRIMARY KEY,
        auth_student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
        auth_tutor_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE,
        auth_token VARCHAR (1000) NOT NULL
          );
        `);
    })
    .then(() => {
      return db.query(`CREATE TABLE digitutor (
        digitutor_id SERIAL PRIMARY KEY,
        digitutor_student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
        digitutor_tutor_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE,
        digitutor_msg_count INT DEFAULT 0,
        digitutor_input VARCHAR(200),
        digitutor_output VARCHAR(200)
          );
        `);
    })
    .then(() => {
      return db.query(`CREATE TABLE quizfb (
        quizfb_id SERIAL PRIMARY KEY,
        quizfb_digitutor_id INT REFERENCES digitutor(digitutor_id) ON DELETE CASCADE,
        quizfb_quiz_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE,
        quizfb_result INT,
        quizfb_notes VARCHAR(200),
        quizfb_percent INT
          );
        `);
    })
    .then(() => {
      return db.query(`CREATE TABLE question (
        ques_id SERIAL PRIMARY KEY,
        ques_body VARCHAR (500) NOT NULL,
        ques_image VARCHAR (200),
        ques_grade INT DEFAULT 0,
        ques_calc BOOLEAN,
        ques_mark INT DEFAULT 1,
        ques1_ans VARCHAR (200),
        ques2_ans VARCHAR (200),
        ques3_ans VARCHAR (200),
        ques_ans_explain VARCHAR (200),
        ques_ans_mark INT DEFAULT 1,
        ques_ans_image VARCHAR (200),
        ques_ans_correct BOOLEAN DEFAULT FALSE,
        ques_ans_sym_b VARCHAR (5),
        ques_ans_sym_a VARCHAR (5),
        ques_quiz_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE,
        ques_lesson_id INT REFERENCES lesson(lesson_id) ON DELETE CASCADE
          );
        `);
    })

    .then(() => {
      const formattedCourses = formatCourseData(courseData);

      const sql1 = format(
        `INSERT INTO course 
     (course_name, course_code, course_desc, course_level, course_image)
     VALUES %L RETURNING *;`,
        formattedCourses
      );
      return db.query(sql1);
    })
    .then((result) => {
      // console.log(result);
    })
    .then(() => {
      //console.log(courseData);
      const formattedTopics = formatTopicData(topicData);
      const sql2 = format(
        `INSERT INTO topic 
      (topic_name, topic_code, topic_desc, topic_index,
       topic_course_id)
      VALUES %L RETURNING *;`,
        formattedTopics
      );
      return db.query(sql2);
    })
    .then(() => {
      const formattedAdmins = formatAdminsData(adminsData);
      const sql3 = format(
        `INSERT INTO admins 
      (admins_username, admins_firstname, admins_lastname, admins_email, admins_password, admins_active, admins_image)
      VALUES %L RETURNING *;`,
        formattedAdmins
      );
      return db.query(sql3);
    })
    .then(() => {
      const formattedTutors = formatTutorData(tutorData);
      const sql4 = format(
        `INSERT INTO tutor 
      (tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_password, tutor_active, tutor_image)
      VALUES %L RETURNING *;`,
        formattedTutors
      );
      console.log(sql4)
      return db.query(sql4);
    })
    .then(() => {
      //console.log(courseData);
      const formattedStudents = formatStudentData(studentData);
      const sql5 = format(
        `INSERT INTO student 
      (student_username, student_firstname, student_lastname, student_email,student_password, student_active,student_image, student_grade, student_targetgrade,student_notes, student_progressbar)
      VALUES %L RETURNING *;`,
        formattedStudents
      );
      
      return db.query(sql5);
    })
    .then(() => {
      //console.log(courseData);
      const formattedLessons = formatLessonData(lessonData);
      const sql6 = format(
        `INSERT INTO lesson 
      (lesson_name, lesson_code, lesson_desc, lesson_ws, lesson_body, lesson_topic_id)
        VALUES %L RETURNING *;`,
        formattedLessons
      );
      return db.query(sql6);
    })
    .then(() => {
      //console.log(courseData);
      const formattedQuizzes = formatQuizData(quizData);
      const sql7 = format(
        `INSERT INTO quiz 
      (quiz_name, quiz_code, quiz_type) VALUES %L RETURNING *;`,
        formattedQuizzes
      );
      return db.query(sql7);
    })
    .then(() => {
      const formattedQuestions = formatQuestionData(questionData);
      const sql8 = format(
        `INSERT INTO question 
      (ques_body,  ques_image, ques_grade, ques_calc, ques_mark,
        ques1_ans, ques2_ans, ques3_ans, ques_ans_explain, ques_ans_mark,
        ques_ans_image, ques_ans_correct, ques_ans_sym_b,
        ques_ans_sym_a, ques_quiz_id,ques_lesson_id ) VALUES %L RETURNING *;`,
        formattedQuestions
      );
      return db.query(sql8);
    })
    .then((result) => {
      // console.log(result);
    });
};

module.exports = seed;
