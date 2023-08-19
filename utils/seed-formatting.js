const bcrypt = require("bcrypt");
const { studentData } = require("../database/data/test-data");
exports.formatCourseData = (courseData) => {
  const formattedCourses = courseData.map((course) => [
    course.course_name,
    course.course_code,
    course.course_desc,
    course.course_level,
    course.course_image,
  ]);
  return formattedCourses;
};

exports.formatTopicData = (topicData) => {
  const formattedTopics = topicData.map((topic) => [
    topic.topic_unit,
    topic.topic_name,
    topic.topic_code,
    topic.topic_desc,
    topic.topic_level,
    topic.topic_course_fk_id,
  ]);
  return formattedTopics;
};


exports.formatStudentData = (studentData) => {
   studentData.forEach(
     (item) =>
       (item.student_password = bcrypt.hashSync(item.student_password, 10))
   );
 
  const formattedStudents = studentData.map((student) => [
    student.student_username,
    student.student_firstname,
    student.student_lastname,
    student.student_email,
    student.student_password,
    student.student_active,
    student.student_image,
    student.student_grade,
    student.student_targetgrade,
    student.student_notes,
    student.student_progressbar,
    student.student_tutor_id,
  ]);
  return formattedStudents;
};

exports.formatAdminsData = (adminsData) => {

  adminsData.forEach(
    (item) =>
      (item.admins_password = bcrypt.hashSync(item.admins_password, 10))
  );


  const formattedAdmins = adminsData.map((admin) => [
    admin.admins_username,
    admin.admins_firstname,
    admin.admins_lastname,
    admin.admins_email,
    admin.admins_password,
    admin.admins_active,
    admin.admins_image,
  ]);
  return formattedAdmins;
};


exports.formatTutorData = (tutorData) => {

  tutorData.forEach(
    (item) =>
      (item.tutor_password = bcrypt.hashSync(item.tutor_password, 10))
  );
  const formattedTutors = tutorData.map((tutor) => [
    tutor.tutor_username,
    tutor.tutor_firstname,
    tutor.tutor_lastname,
    tutor.tutor_email,
    tutor.tutor_password,
    tutor.tutor_active,
    tutor.tutor_image,
  ]);
  return formattedTutors;
};

exports.formatLessonData = (lessonData) => {
  const formattedLessons = lessonData.map((lesson) => [
    lesson.lesson_topic,
    lesson.lesson_name,
    lesson.lesson_code,
    lesson.lesson_desc,
    lesson.lesson_grade,
    lesson.lesson_body,
    lesson.lesson_topic_id,
  ]);
  return formattedLessons;
};

exports.formatQuizData = (quizData) => {
  const formattedQuizzes = quizData.map((quiz) => [
    quiz.quiz_name,
    quiz.quiz_code,
    quiz.quiz_desc,
    quiz.quiz_type,
    quiz.quiz_calc,
    quiz.quiz_course_fk_id,
    quiz.quiz_topic_fk_id,
    quiz.quiz_lesson_fk_id,
  ]);
  return formattedQuizzes;
};

exports.formatQuestionData = (questionData) => {
  const formattedQuestions = questionData.map((question) => [
    question.question_body,
    question.question_ans1,
    question.question_ans2,
    question.question_ans3,
    question.question_image,
    question.question_mark,
    question.question_grade,
    question.question_type,
    question.question_calc,
    question.question_ans_sym_b,
    question.question_ans_sym_a,
    question.question_correct,
    question.question_explaination,
    question.question_ans_mark,
    question.question_ans_image,
    question.question_response1,
    question.question_response2,
    question.question_response3,
    question.question_workingout,
    question.question_feedback,
    question.question_quiz_fk_id,
  ]);
  return formattedQuestions;
};
