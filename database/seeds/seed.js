const db = require("../connection.js");
const format = require("pg-format");
const {
  formatCourseData,
  formatTopicData,
  formatStudentData,
  formatTutorData,
  formatLessonData,
  formatQuizData,
  formatQuestionData,
  formatAdminsData,
  formatAuthAdminData
} = require("../../utils/seed-formatting.js");

const runSeeds = async (data) => {
  const {
    courseData,
    topicData,
    studentData,
    tutorData,
    lessonData,
    quizData,
    questionData,
    adminData,
    authAdminData
  } = data;

  const dropQuestionQuery = `DROP TABLE IF EXISTS question`;
  await db.query(dropQuestionQuery);

  const dropQuizfbQuery = `DROP TABLE IF EXISTS quizfb`;
  await db.query(dropQuizfbQuery);

  const dropDigitutorQuery = `DROP TABLE IF EXISTS digitutor`;
  await db.query(dropDigitutorQuery);

  const dropQuizQuery = `DROP TABLE IF EXISTS quiz`;
  await db.query(dropQuizQuery);

  const dropLessonQuery = `DROP TABLE IF EXISTS lesson`;
  await db.query(dropLessonQuery);

  const dropTutorQuery = `DROP TABLE IF EXISTS tutor`;
  await db.query(dropTutorQuery);

  const dropAdminsQuery = `DROP TABLE IF EXISTS admin`;
  await db.query(dropAdminsQuery);

  const dropStudentQuery = `DROP TABLE IF EXISTS student`;
  await db.query(dropStudentQuery);
  
  const dropAuthAdminQuery = `DROP TABLE IF EXISTS authAdmin`;
  await db.query(dropAuthAdminQuery);

  const dropTopicQuery = `DROP TABLE IF EXISTS topic`;
  await db.query(dropTopicQuery);

  const dropCourseQuery = `DROP TABLE IF EXISTS course`;
  await db.query(dropCourseQuery);

  const createCourseQuery = `CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL, 
    course_code VARCHAR(100) NOT NULL, 
    course_desc VARCHAR(100),
    course_level VARCHAR(100), 
    course_image VARCHAR(100) )`;
  await db.query(createCourseQuery);

  const createTopicQuery = `CREATE TABLE topic ( 
    topic_id SERIAL PRIMARY KEY, 
    topic_unit INT, topic_name VARCHAR(100) NOT NULL, topic_code VARCHAR(100), 
    topic_desc VARCHAR(200) NOT NULL,
    topic_level VARCHAR(100),
    topic_course_fk_id INT REFERENCES course(course_id) ON DELETE CASCADE )`;
  await db.query(createTopicQuery);

  const createAdminsQuery = `CREATE TABLE admin ( 
    admin_id SERIAL PRIMARY KEY, 
    admin_username VARCHAR(200) NOT NULL UNIQUE, admin_firstname VARCHAR(200) NOT NULL, 
    admin_lastname VARCHAR(200), 
    admin_email VARCHAR(200) NOT NULL, 
    admin_password VARCHAR(100) NOT NULL,
    admin_active BOOLEAN, 
    admin_image VARCHAR(200) )`;
  await db.query(createAdminsQuery);

  const createTutorQuery = `CREATE TABLE tutor ( tutor_id SERIAL PRIMARY KEY, tutor_username VARCHAR(200) NOT NULL UNIQUE, tutor_firstname VARCHAR(200) NOT NULL, tutor_lastname VARCHAR(200), tutor_email VARCHAR(200) NOT NULL, tutor_password VARCHAR(100) NOT NULL, tutor_active BOOLEAN, tutor_image VARCHAR(200) )`;
  await db.query(createTutorQuery);

  const createStudentQuery = `CREATE TABLE student ( 
    student_id SERIAL PRIMARY KEY, 
    student_username VARCHAR(100) NOT NULL UNIQUE, student_firstname VARCHAR(100) NOT NULL,
    student_lastname VARCHAR(100), 
    student_email VARCHAR(100) NOT NULL, 
    student_password VARCHAR(100) NOT NULL, 
    student_active BOOLEAN DEFAULT TRUE, 
    student_grade INT DEFAULT 0, 
    student_targetgrade INT DEFAULT 0, 
    student_progressbar INT DEFAULT 0, 
    student_notes VARCHAR(200), 
    student_image VARCHAR(100), 
    student_msg_count INT DEFAULT 0,
    student_msg_input VARCHAR(100),  
    student_msg_output VARCHAR(100), 
    student_course_fk_id INT REFERENCES course(course_id) ON DELETE CASCADE,
    student_tutor_fk_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE )`;
  await db.query(createStudentQuery);

  const createAuthAdminQuery = `CREATE TABLE authAdmin ( auth_id SERIAL PRIMARY KEY, admin_id INT REFERENCES admin(admin_id) ON DELETE CASCADE, admin_device_id VARCHAR (1000) NOT NULL, auth_admin_token VARCHAR (1000) NOT NULL )`;
  await db.query(createAuthAdminQuery);

  const createLessonQuery = `CREATE TABLE lesson ( lesson_id SERIAL PRIMARY KEY, lesson_topic VARCHAR(100) NOT NULL,lesson_name VARCHAR(100) NOT NULL, lesson_code VARCHAR(100), lesson_desc VARCHAR(200) NOT NULL, lesson_grade INT DEFAULT 0, lesson_body VARCHAR(100), lesson_topic_fk_id INT REFERENCES topic(topic_id) ON DELETE CASCADE )`;
  await db.query(createLessonQuery);

  const createQuizQuery = `CREATE TABLE quiz ( quiz_id SERIAL PRIMARY KEY, quiz_name VARCHAR(100) NOT NULL, quiz_code VARCHAR(100), quiz_desc VARCHAR(200), quiz_type VARCHAR(100), quiz_calc BOOLEAN DEFAULT TRUE,quiz_course_fk_id INT REFERENCES course(course_id) ON DELETE CASCADE,quiz_topic_fk_id INT REFERENCES topic(topic_id) ON DELETE CASCADE,quiz_lesson_fk_id INT REFERENCES lesson(lesson_id) ON DELETE CASCADE )`;
  await db.query(createQuizQuery);

  const createQuestionQuery = `CREATE TABLE question ( 
    question_id SERIAL PRIMARY KEY, 
    question_body VARCHAR (200) NOT NULL, 
    question_ans1 VARCHAR (100), 
    question_ans2 VARCHAR (100), 
    question_ans3 VARCHAR (100),
    question_image VARCHAR (100), 
    question_mark INT DEFAULT 1, 
    question_grade INT DEFAULT 0, 
    question_type VARCHAR (100), 
    question_calc BOOLEAN,  
    question_ans_sym_b VARCHAR (5), 
    question_ans_sym_a VARCHAR (5),
    question_correct BOOLEAN DEFAULT FALSE,  
    question_explaination VARCHAR (200), 
    question_ans_mark INT DEFAULT 1, 
    question_ans_image VARCHAR (100),  
    question_response1 VARCHAR (100),  
    question_response2 VARCHAR (100),  
    question_response3 VARCHAR (100),  
    question_workingout VARCHAR (100),  
    question_feedback VARCHAR (100),  
    question_quiz_fk_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE )`;
  await db.query(createQuestionQuery);

  const formattedCourses = formatCourseData(courseData);
  const insertCourseQuery = format(
    `INSERT INTO course (course_name, course_code, course_desc, course_level, course_image) VALUES %L RETURNING *;`,
    formattedCourses
  );
  const course = await db.query(insertCourseQuery);

  const formattedTopics = formatTopicData(topicData);
  const insertTopicQuery = format(
    `INSERT INTO topic (topic_unit, topic_name, topic_code, topic_desc, topic_level, topic_course_fk_id) VALUES %L RETURNING *;`,
    formattedTopics
  );
  const topic = await db.query(insertTopicQuery);

  const formattedAdmins = formatAdminsData(adminData);
  const insertAdminQuery = format(
    `INSERT INTO admin (admin_username, admin_firstname, admin_lastname, admin_email, admin_password, admin_active, admin_image) VALUES %L RETURNING *;`,
    formattedAdmins
  );
  const admin = await db.query(insertAdminQuery);

  const formattedTutors = formatTutorData(tutorData);
  const insertTutorQuery = format(
    `INSERT INTO tutor (tutor_username, tutor_firstname, tutor_lastname, tutor_email, tutor_password, tutor_active, tutor_image) VALUES %L RETURNING *;`,
    formattedTutors
  );
  const tutor = await db.query(insertTutorQuery);

  const formattedStudents = formatStudentData(studentData);
  const insertStudentQuery = format(
    `INSERT INTO student (student_username, student_firstname, student_lastname, student_email,student_password, student_active,student_image, student_grade, student_targetgrade,student_notes, student_progressbar, student_msg_count, student_msg_input, student_msg_output, student_course_fk_id, student_tutor_fk_id) VALUES %L RETURNING *;`,
    formattedStudents
  );
  const student = await db.query(insertStudentQuery);

  const formattedAuthAdmin = formatAuthAdminData(authAdminData);
  const insertAuthAdminQuery = format(
    `INSERT INTO authAdmin (admin_id, admin_device_id, auth_admin_token) VALUES %L RETURNING *;`,
    formattedAuthAdmin
  );
  const authAdmin = await db.query(insertAuthAdminQuery);

  const formattedLessons = formatLessonData(lessonData);
  const insertLessonQuery = format(
    `INSERT INTO lesson (lesson_topic,lesson_name, lesson_code, lesson_desc, lesson_grade, lesson_body, lesson_topic_fk_id) VALUES %L RETURNING *;`,
    formattedLessons
  );
  const lesson = await db.query(insertLessonQuery);

  const formattedQuizzes = formatQuizData(quizData);
  const insertQuizQuery = format(
    `INSERT INTO quiz (quiz_name, quiz_code, quiz_desc, quiz_type, quiz_calc, quiz_course_fk_id, quiz_topic_fk_id,quiz_lesson_fk_id) VALUES %L RETURNING *;`,
    formattedQuizzes
  );
  const quiz = await db.query(insertQuizQuery);

  const formattedQuestions = formatQuestionData(questionData);
  const insertQuestionQuery = format(
    `INSERT INTO question (question_body, question_ans1, question_ans2, question_ans3, question_image, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination, question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback,question_quiz_fk_id) VALUES %L RETURNING *;`,
    formattedQuestions
  );
  const question = await db.query(insertQuestionQuery);

  return { course, topic, admin, tutor, student, lesson, quiz, question, authAdmin };
};

module.exports = runSeeds;
