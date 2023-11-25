const bcrypt = require("bcrypt");

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
   studentData.forEach((item) =>
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
    student.student_message_count,
    student.student_message_input,
    student.student_message_output,
    student.student_course_fk_id,
    student.student_tutor_fk_id
  ]);

  return formattedStudents;
};

exports.formatAdminsData = (adminData) => {
  
  adminData.forEach(
    (item) =>
      (item.admin_password = bcrypt.hashSync(item.admin_password, 10))
  );


  const formattedAdmin = adminData.map((admin) => [
    admin.admin_username,
    admin.admin_firstname,
    admin.admin_lastname,
    admin.admin_email,
    admin.admin_password,
    admin.admin_active,
    admin.admin_image,
  ]);
 
  return formattedAdmin;
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

exports.formatAuthAdminData = (authAdminData) => {
  const formattedAuthAdmin = authAdminData.map((authAdmin) => [
    authAdmin.admin_id,
    authAdmin.admin_device_id,
    authAdmin.auth_admin_token,
  ]);
  return formattedAuthAdmin;
};

exports.formatAuthTutorData = (authTutorData) => {
  const formattedAuthTutor = authTutorData.map((authTutor) => [
    authTutor.tutor_id,
    authTutor.tutor_device_id,
    authTutor.auth_tutor_token,
  ]);
  return formattedAuthTutor;
};

exports.formatAuthStudentData = (authStudentData) => {
  const formattedAuthStudent = authStudentData.map((authStudent) => [
    authStudent.student_id,
    authStudent.student_device_id,
    authStudent.auth_student_token,
  ]);
  return formattedAuthStudent;
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

exports.formatStudentQuizData = (studentQuizData) => {
  const formattedStudentQuizzes = studentQuizData.map((studentQuiz) => [
    studentQuiz.studentQuiz_result,
    studentQuiz.studentQuiz_percent,
    studentQuiz.studentQuiz_feedback,
    studentQuiz.studentQuiz_quiz_fk_id,
    studentQuiz.studentQuiz_student_fk_id
  ]);

  return formattedStudentQuizzes;
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
