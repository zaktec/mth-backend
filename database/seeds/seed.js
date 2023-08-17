const db = require("../connection.js");
const format = require("pg-format");
const { formatCourseData, formatTopicData, formatStudentData, formatTutorData, formatLessonData, formatQuizData, formatQuestionData, formatAdminsData } = require("../../utils/seed-formatting.js");

const runSeeds  = async (data) => {
  const { courseData, topicData, studentData, tutorData, lessonData, quizData, questionData, adminsData } = data;

  const dropQuestionQuery = `DROP TABLE IF EXISTS question`;
  await db.query(dropQuestionQuery);

  const dropQuizfbQuery = `DROP TABLE IF EXISTS quizfb`;
  await db.query(dropQuizfbQuery);

  const dropDigitutorQuery = `DROP TABLE IF EXISTS digitutor`;
  await db.query(dropDigitutorQuery);

  const dropAuthQuery = `DROP TABLE IF EXISTS auth`;
  await db.query(dropAuthQuery);

  const dropQuizQuery = `DROP TABLE IF EXISTS quiz`;
  await db.query(dropQuizQuery);

  const dropLessonQuery = `DROP TABLE IF EXISTS lesson`;
  await db.query(dropLessonQuery);

  const dropStudentQuery = `DROP TABLE IF EXISTS student`;
  await db.query(dropStudentQuery);

  const dropTutorQuery = `DROP TABLE IF EXISTS tutor`;
  await db.query(dropTutorQuery);

  const dropAdminsQuery = `DROP TABLE IF EXISTS admins`;
  await db.query(dropAdminsQuery);

  const dropTopicQuery = `DROP TABLE IF EXISTS topic`;
  await db.query(dropTopicQuery);

  const dropCourseQuery = `DROP TABLE IF EXISTS course`;
  await db.query(dropCourseQuery);

  const createCourseQuery = `CREATE TABLE course ( course_id SERIAL PRIMARY KEY, course_name VARCHAR(100) NOT NULL, course_code VARCHAR(100) NOT NULL, course_desc VARCHAR(100), course_level VARCHAR(100), course_image VARCHAR(100) )`;
  await db.query(createCourseQuery);

  
  const createTopicQuery = `CREATE TABLE topic ( topic_id SERIAL PRIMARY KEY, topic_unit INT, topic_name VARCHAR(100) NOT NULL, topic_code VARCHAR(100), topic_desc VARCHAR(200) NOT NULL, topic_level VARCHAR(100), topic_course_id INT REFERENCES course(course_id) ON DELETE CASCADE )`;
  await db.query(createTopicQuery);
  
  const createAdminsQuery = `CREATE TABLE admins ( admins_id SERIAL PRIMARY KEY, admins_username VARCHAR(200) NOT NULL UNIQUE, admins_firstname VARCHAR(200) NOT NULL, admins_lastname VARCHAR(200), admins_email VARCHAR(200) NOT NULL, admins_password VARCHAR(100) NOT NULL, admins_active BOOLEAN, admins_image VARCHAR(200) )`;
  await db.query(createAdminsQuery);
  
  const createTutorQuery = `CREATE TABLE tutor ( tutor_id SERIAL PRIMARY KEY, tutor_username VARCHAR(200) NOT NULL UNIQUE, tutor_firstname VARCHAR(200) NOT NULL, tutor_lastname VARCHAR(200), tutor_email VARCHAR(200) NOT NULL, tutor_password VARCHAR(100) NOT NULL, tutor_active BOOLEAN, tutor_image VARCHAR(200) )`;
  await db.query(createTutorQuery);
  
  const createStudentQuery = `CREATE TABLE student ( student_id SERIAL PRIMARY KEY, student_username VARCHAR(200) NOT NULL UNIQUE, student_firstname VARCHAR(200) NOT NULL, student_lastname VARCHAR(200) NOT NULL, student_email VARCHAR(200) NOT NULL, student_password VARCHAR(200) NOT NULL, student_active BOOLEAN DEFAULT TRUE, student_grade INT DEFAULT 0, student_targetgrade INT DEFAULT 0, student_notes VARCHAR(500), student_progressbar INT DEFAULT 0, student_image VARCHAR(200), student_tutor_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE )`;
  await db.query(createStudentQuery);
  
  const createLessonQuery = `CREATE TABLE lesson ( lesson_id SERIAL PRIMARY KEY, lesson_topic VARCHAR(100) NOT NULL,lesson_name VARCHAR(100) NOT NULL, lesson_code VARCHAR(100), lesson_desc VARCHAR(200) NOT NULL, lesson_grade INT DEFAULT 0, lesson_body VARCHAR(100), lesson_topic_id INT REFERENCES topic(topic_id) ON DELETE CASCADE )`;
  await db.query(createLessonQuery);
  
  const createQuizQuery = `CREATE TABLE quiz ( quiz_id SERIAL PRIMARY KEY, quiz_name VARCHAR(200) NOT NULL, quiz_code VARCHAR(200), quiz_type VARCHAR(200) NOT NULL )`;
  await db.query(createQuizQuery);
  
  const createAuthQuery = `CREATE TABLE auth ( auth_id SERIAL PRIMARY KEY, auth_student_id INT REFERENCES student(student_id) ON DELETE CASCADE, auth_tutor_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE, auth_token VARCHAR (1000) NOT NULL )`;
  await db.query(createAuthQuery);
  
  const createDigitutorQuery = `CREATE TABLE digitutor ( digitutor_id SERIAL PRIMARY KEY, digitutor_student_id INT REFERENCES student(student_id) ON DELETE CASCADE, digitutor_tutor_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE, digitutor_msg_count INT DEFAULT 0, digitutor_input VARCHAR(200), digitutor_output VARCHAR(200) )`;
  await db.query(createDigitutorQuery);
  
  const createQuizfbQuery = `CREATE TABLE quizfb ( quizfb_id SERIAL PRIMARY KEY, quizfb_digitutor_id INT REFERENCES digitutor(digitutor_id) ON DELETE CASCADE, quizfb_quiz_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE, quizfb_result INT, quizfb_notes VARCHAR(200), quizfb_percent INT )`;
  await db.query(createQuizfbQuery);
  
  const createQuestionQuery = `CREATE TABLE question ( ques_id SERIAL PRIMARY KEY, ques_body VARCHAR (500) NOT NULL, ques_image VARCHAR (200), ques_grade INT DEFAULT 0, ques_calc BOOLEAN, ques_mark INT DEFAULT 1, ques1_ans VARCHAR (200), ques2_ans VARCHAR (200), ques3_ans VARCHAR (200), ques_ans_explain VARCHAR (200), ques_ans_mark INT DEFAULT 1, ques_ans_image VARCHAR (200), ques_ans_correct BOOLEAN DEFAULT FALSE, ques_ans_sym_b VARCHAR (5), ques_ans_sym_a VARCHAR (5), ques_quiz_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE, ques_lesson_id INT REFERENCES lesson(lesson_id) ON DELETE CASCADE )`;
  await db.query(createQuestionQuery);

  const formattedCourses = formatCourseData(courseData);
  const insertCourseQuery = format( `INSERT INTO course (course_name, course_code, course_desc, course_level, course_image) VALUES %L RETURNING *;`, formattedCourses );
  const course = await db.query(insertCourseQuery);

  const formattedTopics = formatTopicData(topicData);
  const insertTopicQuery = format( `INSERT INTO topic (topic_unit, topic_name, topic_code, topic_desc, topic_level, topic_course_id) VALUES %L RETURNING *;`, formattedTopics );
  const topic = await db.query(insertTopicQuery);

  const formattedAdmins = formatAdminsData(adminsData);
  const insertAdminQuery = format( `INSERT INTO admins (admins_username, admins_firstname, admins_lastname, admins_email, admins_password, admins_active, admins_image) VALUES %L RETURNING *;`, formattedAdmins );
  const admin = await db.query(insertAdminQuery);

  const formattedTutors = formatTutorData(tutorData);
  const insertTutorQuery = format( `INSERT INTO tutor (tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_password, tutor_active, tutor_image) VALUES %L RETURNING *;`, formattedTutors );
  const tutor = await db.query(insertTutorQuery);

  const formattedStudents = formatStudentData(studentData);
  const insertStudentQuery = format( `INSERT INTO student (student_username, student_firstname, student_lastname, student_email,student_password, student_active,student_image, student_grade, student_targetgrade,student_notes, student_progressbar, student_tutor_id) VALUES %L RETURNING *;`, formattedStudents );
  const student = await db.query(insertStudentQuery);

  const formattedLessons = formatLessonData(lessonData);
  const insertLessonQuery = format( `INSERT INTO lesson (lesson_topic,lesson_name, lesson_code, lesson_desc, lesson_grade, lesson_body, lesson_topic_id) VALUES %L RETURNING *;`, formattedLessons );
  const lesson = await db.query(insertLessonQuery);

  const formattedQuizzes = formatQuizData(quizData);
  const insertQuizQuery = format( `INSERT INTO quiz (quiz_name, quiz_code, quiz_type) VALUES %L RETURNING *;`, formattedQuizzes );
  const quiz = await db.query(insertQuizQuery);

  const formattedQuestions = formatQuestionData(questionData);
  const insertQuestionQuery = format( `INSERT INTO question (ques_body,  ques_image, ques_grade, ques_calc, ques_mark, ques1_ans, ques2_ans, ques3_ans, ques_ans_explain, ques_ans_mark, ques_ans_image, ques_ans_correct, ques_ans_sym_b, ques_ans_sym_a, ques_quiz_id,ques_lesson_id ) VALUES %L RETURNING *;`, formattedQuestions );
  const question = await db.query(insertQuestionQuery);

  return { course, topic, admin, tutor, student, lesson, quiz, question };
}

module.exports = runSeeds;
