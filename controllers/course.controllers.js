const {  selectCourses, selectCourseById } =require('../models/course.models.js');
const { checkCourseExists } = require('../utils/utils.js');

exports.getCourses = ( req, res, next) => {
  const { sort_by } = req.query;
selectCourses(sort_by)
.then((courses) => {
  
    res.status(200).send({ courses });
  })
  .catch(next); 
};

exports.getCourseById  = (req, res, next) => {
  const { course_id } = req.params;
  console.log(course_id)

  return checkCourseExists(course_id)
  .then((courseExist) => {
    if (courseExist){
      return selectCourseById(course_id).then((course)=> {
        res.status(200).send({course})
    
  })
  } else {
    return Promise.reject ({ status: 404, msg: "Not found"});
  }
    })
    .catch(next);
  };

exports.postCourse = () => {};

exports.removeCourseById = () => {};

exports.patchCourseById = () => {};