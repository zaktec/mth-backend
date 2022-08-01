exports.formatCourseData = (courseData) => {
  const formattedCourses = courseData.map((course) => [
    course.course_name,
    course.course_code,
    course.course_desc,
    course.course_level,
    course.course_image,
    course.course_created_at,
  ]);
  return formattedCourses;
};

exports.formatTopicData = (topicData) => {
  const formattedTopics = topicData.map((topic) => [
    topic.topic_name,
    topic.topic_code,
    topic.topic_desc,
    topic.topic_index,
    topic.topic_created_at,
    topic.topic_course_id,
  ]);
  return formattedTopics;
};

exports.formatStudentData = (studentData) => {
  const formattedStudents = studentData.map((student) => [
    student.student_firstname,
    student.student_lastname, 
    student.student_email,
    student.student_active, 
    student.student_image, 
    student.student_quizresult,
    student.student_grade, 
    student.student_targetgrade,
    student.student_notes,
    student.student_progressbar,
    student.student_course_id,
    student.student_tutor_id,
    student.student_created_at,
  ]);
  return formattedStudents;
};

exports.formatTutorData = (tutorData) => {
  const formattedTutors = tutorData.map((tutor) => [
    tutor.tutor_firstname,
    tutor.tutor_lastname,
    tutor.tutor_email,
    tutor.tutor_active,
    tutor.tutor_image,
    tutor.tutor_created_at,
  ]);
  return formattedTutors;
};

