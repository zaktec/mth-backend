
exports.formatCourseData =(courseData) => {
    const formattedCourses = courseData.map((course) => [
        course.course_name, course.course_code, course.course_desc,course.course_level,course.course_image, course.course_date
     ]);
    return formattedCourses
}


exports.formatTopicData =(topicData) => {
    const formattedTopics = topicData.map((topic) => [
        topic.topic_name, topic.topic_code, topic.topic_desc,topic.topic_index,topic.topic_date, topic.topic_course_id
     ]);
    return formattedTopics
}