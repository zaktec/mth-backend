const {  selectCourses } =require('../models/course.models.js')

exports.getCourses = ( req, res) => {

selectCourses().then((courses) => {
    res.status(200).send({ courses});
  })
  .catch((err) => {
    console.log(err)

  })
};


exports.getCourseById = () => {};

exports.postCourse = () => {};

exports.removeCourseById = () => {};

exports.patchCourseById = () => {};