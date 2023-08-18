module.exports = [
  {
   "quiz_name": "GCSE Paper 1-F (NC)",
   "quiz_code": "GFECQ1",
   "quiz_desc": "Edexcel GCSE Paper 1-F (NC) 2017-Nov",
   "quiz_type": "Course",
   "quiz_calc": "FALSE",
   "fk_quiz_course_id": 1,
  },
  {
    "quiz_name": "Number",
    "quiz_code": "GFNTQ",
    "quiz_desc": "Number Topic Quiz",
    "quiz_type": "Topic",
    "quiz_calc": "TRUE",
    "fk_quiz_topic_id":  1,
  },
  {
    "quiz_name": "Lesson 1 Quiz",
    "quiz_code": "GL1Q",
    "quiz_desc": "Place Value Quiz",
    "quiz_type": "Lesson",
    "quiz_calc": "FALSE",
    "fk_quiz_lesson_id": 2,
  },
 ]