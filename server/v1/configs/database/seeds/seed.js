const format = require("pg-format");
const db = require("../connection.js");

const {
  formatQuizData,
  formatTopicData,
  formatTutorData,
  formatCourseData,
  formatLessonData,
  formatAdminsData,
  formatStudentData,
  formatQuestionData,
  formatAuthAdminData,
  formatAuthTutorData,
  formatStudentQuizData,
  formatAuthStudentData,
} = require("./seed-formatting.js");

const runSeeds = async (data) => {
  const {
    quizData,
    adminData,
    topicData,
    tutorData,
    lessonData,
    courseData,
    studentData,
    questionData,
    authAdminData,
    authTutorData,
    authStudentData,
    studentQuizData,
  } = data;

  const dropQuestionQuery = `DROP TABLE IF EXISTS question`;
  await db.query(dropQuestionQuery);

  const dropStudentQuizQuery = `DROP TABLE IF EXISTS studentQuiz`;
  await db.query(dropStudentQuizQuery);

  const dropQuizQuery = `DROP TABLE IF EXISTS quiz`;
  await db.query(dropQuizQuery);

  const dropLessonQuery = `DROP TABLE IF EXISTS lesson`;
  await db.query(dropLessonQuery);

  const dropAuthAdminQuery = `DROP TABLE IF EXISTS authAdmin`;
  await db.query(dropAuthAdminQuery);

  const dropAuthTutorQuery = `DROP TABLE IF EXISTS authTutor`;
  await db.query(dropAuthTutorQuery);

  const dropAuthStudentQuery = `DROP TABLE IF EXISTS authStudent`;
  await db.query(dropAuthStudentQuery);

  const dropStudentQuery = `DROP TABLE IF EXISTS student`;
  await db.query(dropStudentQuery);

  const dropTutorQuery = `DROP TABLE IF EXISTS tutor`;
  await db.query(dropTutorQuery);

  const dropAdminsQuery = `DROP TABLE IF EXISTS admin`;
  await db.query(dropAdminsQuery);

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
    course_image VARCHAR(100))`;
  await db.query(createCourseQuery);

  const createTopicQuery = `CREATE TABLE topic ( 
    topic_id SERIAL PRIMARY KEY, 
    topic_unit INT, 
    topic_name VARCHAR(100) NOT NULL, 
    topic_code VARCHAR(100), 
    topic_desc VARCHAR(200),
    topic_level VARCHAR(100),
    topic_course_fk_id INT REFERENCES course(course_id) ON DELETE CASCADE)`;
  await db.query(createTopicQuery);

  const createLessonQuery = `CREATE TABLE lesson ( 
    lesson_id SERIAL PRIMARY KEY, 
    lesson_topic VARCHAR(100) NOT NULL,
    lesson_name VARCHAR(100) NOT NULL, 
    lesson_code VARCHAR(100), 
    lesson_desc VARCHAR(200) NOT NULL, 
    lesson_grade INT DEFAULT 0,
     lesson_body VARCHAR(100), 
    lesson_topic_fk_id INT REFERENCES topic(topic_id) ON DELETE CASCADE)`;
  await db.query(createLessonQuery);

  const createQuizQuery = `CREATE TABLE quiz 
  ( quiz_id SERIAL PRIMARY KEY,
     quiz_name VARCHAR(100) NOT NULL, 
     quiz_code VARCHAR(100),
      quiz_desc VARCHAR(200), 
      quiz_type VARCHAR(100), 
      quiz_calc BOOLEAN DEFAULT TRUE,
      quiz_course_fk_id INT REFERENCES course(course_id) ON DELETE CASCADE,
      quiz_topic_fk_id INT REFERENCES topic(topic_id) ON DELETE CASCADE,
    quiz_lesson_fk_id INT REFERENCES lesson(lesson_id) ON DELETE CASCADE)`;
  await db.query(createQuizQuery);

  const createAdminsQuery = `CREATE TABLE admin ( 
    admin_id SERIAL PRIMARY KEY, 
    admin_username VARCHAR(200) NOT NULL UNIQUE, admin_firstname VARCHAR(200) NOT NULL, 
    admin_lastname VARCHAR(200), 
    admin_email VARCHAR(200) NOT NULL, 
    admin_password VARCHAR(100) NOT NULL,
    admin_active BOOLEAN, 
    admin_image VARCHAR(1000))`;
  await db.query(createAdminsQuery);

  const createTutorQuery = `CREATE TABLE tutor (
    tutor_id SERIAL PRIMARY KEY,
    tutor_username VARCHAR(200) NOT NULL UNIQUE, 
    tutor_firstname VARCHAR(200) NOT NULL,
    tutor_lastname VARCHAR(200), 
    tutor_email VARCHAR(200) NOT NULL,
    tutor_password VARCHAR(100) NOT NULL,
    tutor_active BOOLEAN,
    tutor_image VARCHAR(1000))`;
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
    student_image VARCHAR(1000), 
    student_message_count INT DEFAULT 0,
    student_message_input VARCHAR(100),
    student_message_output VARCHAR(100),
    student_tutor_fk_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE,
    student_course_fk_id INT REFERENCES course(course_id) ON DELETE CASCADE)`;
  await db.query(createStudentQuery);

  const createAuthAdminQuery = `CREATE TABLE authAdmin ( 
    auth_id SERIAL PRIMARY KEY, 
    admin_id INT REFERENCES admin(admin_id) ON DELETE CASCADE, 
    admin_device_id VARCHAR (1000) NOT NULL, 
    auth_admin_token VARCHAR (1000) NOT NULL)`;
  await db.query(createAuthAdminQuery);

  const createAuthTutorQuery = `CREATE TABLE authTutor (
     auth_id SERIAL PRIMARY KEY, 
     tutor_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE,
      tutor_device_id VARCHAR (1000) NOT NULL,
    auth_tutor_token VARCHAR (1000) NOT NULL)`;
  await db.query(createAuthTutorQuery);

  const createAuthStudentQuery = `CREATE TABLE authStudent ( 
    auth_id SERIAL PRIMARY KEY, 
    student_id INT REFERENCES student(student_id) ON DELETE CASCADE,
     student_device_id VARCHAR (1000) NOT NULL, 
    auth_student_token VARCHAR (1000) NOT NULL)`;
  await db.query(createAuthStudentQuery);

  const createStudentQuizQuery = `CREATE TABLE studentQuiz (
    studentQuiz_id SERIAL PRIMARY KEY,
    studentQuiz_learner VARCHAR(100),
    studentQuiz_status VARCHAR(100),
    studentQuiz_result VARCHAR,
    studentQuiz_percent VARCHAR(100),
    studentQuiz_shareable_details VARCHAR,
    studentQuiz_tutor_feedback VARCHAR,
    studentQuiz_student_feedback VARCHAR,
    studentQuiz_tutor_feedback_toggle VARCHAR(25),
    studentQuiz_student_feedback_toggle VARCHAR(25),
    studentQuiz_quiz_fk_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE,
    studentQuiz_tutor_fk_id INT REFERENCES tutor(tutor_id) ON DELETE CASCADE,
    studentQuiz_student_fk_id INT REFERENCES student(student_id) ON DELETE CASCADE)`;
  await db.query(createStudentQuizQuery);

  const createQuestionQuery = `CREATE TABLE question (
    question_id SERIAL PRIMARY KEY,
    question_image VARCHAR (1000),
    question_body VARCHAR (200),
    question_answer1 VARCHAR (100),
    question_answer2 VARCHAR (100),
    question_answer3 VARCHAR (100),
    question_answer4 VARCHAR (100),
    question_mark INT DEFAULT 1, 
    question_grade INT DEFAULT 0, 
    question_type VARCHAR (100), 
    question_calc BOOLEAN,  
    question_ans_sym_b VARCHAR (5), 
    question_ans_sym_a VARCHAR (5),
    question_correct BOOLEAN DEFAULT false,  
    question_explaination VARCHAR (200), 
    question_ans_mark INT DEFAULT 1,
    question_ans_image VARCHAR (100),  
    question_response1 VARCHAR (100),  
    question_response2 VARCHAR (100),  
    question_response3 VARCHAR (100),  
    question_workingout VARCHAR (100),  
    question_feedback VARCHAR (100),
    question_number INT,
    question_lesson_fk_id INT REFERENCES lesson(lesson_id) ON DELETE CASCADE,
    question_quiz_fk_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE)`;
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
    `INSERT INTO student (student_username, student_firstname, student_lastname, student_email,student_password, student_active,student_image, student_grade, student_targetgrade,student_notes, student_progressbar, student_message_count, student_message_input, student_message_output, student_course_fk_id, student_tutor_fk_id) VALUES %L RETURNING *;`,
    formattedStudents
  );
  const student = await db.query(insertStudentQuery);

  const formattedAuthAdmin = formatAuthAdminData(authAdminData);
  const insertAuthAdminQuery = format(
    `INSERT INTO authAdmin (admin_id, admin_device_id, auth_admin_token) VALUES %L RETURNING *;`,
    formattedAuthAdmin
  );
  const authAdmin = await db.query(insertAuthAdminQuery);

  const formattedAuthTutor = formatAuthTutorData(authTutorData);
  const insertAuthTutorQuery = format(
    `INSERT INTO authTutor (tutor_id, tutor_device_id, auth_tutor_token) VALUES %L RETURNING *;`,
    formattedAuthTutor
  );
  const authTutor = await db.query(insertAuthTutorQuery);

  const formattedAuthStudent = formatAuthStudentData(authStudentData);
  const insertAuthStudentQuery = format(
    `INSERT INTO authStudent (student_id, student_device_id, auth_student_token) VALUES %L RETURNING *;`,
    formattedAuthStudent
  );
  const authStudent = await db.query(insertAuthStudentQuery);

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

  const formattedStudentQuizzes = formatStudentQuizData(studentQuizData);
  const insertStudentQuizQuery = format(
    `INSERT INTO studentQuiz (studentQuiz_learner, studentQuiz_status, studentQuiz_result, studentQuiz_percent, studentQuiz_shareable_details, studentQuiz_tutor_feedback, studentQuiz_student_feedback, studentQuiz_tutor_feedback_toggle, studentQuiz_student_feedback_toggle, studentQuiz_quiz_fk_id, studentQuiz_tutor_fk_id, studentQuiz_student_fk_id) VALUES %L RETURNING *;`,
    formattedStudentQuizzes
  );
  const studentQuiz = await db.query(insertStudentQuizQuery);

  const formattedQuestions = formatQuestionData(questionData);
  const insertQuestionQuery = format(
    `INSERT INTO question (question_image, question_body, question_answer1, question_answer2, question_answer3, question_answer4, question_mark, question_grade, question_type, question_calc, question_ans_sym_b, question_ans_sym_a, question_correct, question_explaination, question_ans_mark, question_ans_image, question_response1, question_response2, question_response3, question_workingout, question_feedback, question_number, question_lesson_fk_id, question_quiz_fk_id) VALUES %L RETURNING *;`,
    formattedQuestions
  );
  const question = await db.query(insertQuestionQuery);

  return {
    quiz,
    topic,
    admin,
    tutor,
    course,
    lesson,
    student,
    question,
    authAdmin,
    authTutor,
    authStudent,
    studentQuiz,
  };
};

module.exports = runSeeds;