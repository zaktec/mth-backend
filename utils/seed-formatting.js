exports.formatCourseData = (courseData) => {
  const formattedCourses = courseData.map((course) => [
    course.course_name,
    course.course_code,
    course.course_desc,
    course.course_level,
    course.course_image
    
  ]);
  return formattedCourses;
};

exports.formatTopicData = (topicData) => {
  const formattedTopics = topicData.map((topic) => [
    topic.topic_name,
    topic.topic_code,
    topic.topic_desc,
    topic.topic_index,
    topic.topic_course_id
  ]);
  return formattedTopics;
};

exports.formatStudentData = (studentData) => {
  const formattedStudents = studentData.map((student) => [
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
  
   
  ]);
  return formattedStudents;
};

exports.formatTutorData = (tutorData) => {
  const formattedTutors = tutorData.map((tutor) => [
    tutor.tutor_firstname,
    tutor.tutor_lastname,
    tutor.tutor_email,
    tutor.tutor_password,
    tutor.tutor_active,
    tutor.tutor_image
   
  ]);
  return formattedTutors;
};

exports.formatLessonData = (lessonData) => {
  const formattedLessons = lessonData.map((lesson) => [
    lesson.lesson_name,
    lesson.lesson_code,
    lesson.lesson_desc,
    lesson.lesson_ws,
    lesson.lesson_body,
    lesson.lesson_topic_id
   
  ]);
  return formattedLessons;
};

exports.formatQuizData = (quizData) => {
  const formattedQuizzes = quizData.map((quiz) => [
    quiz.quiz_name,
    quiz.quiz_code,
    quiz.quiz_type
   
  ]);
  return formattedQuizzes;
};

