const {  selectStudents } =require('../models/student.models.js')

exports.getStudents = ( req, res) => {

  console.log("inside")
selectStudents().then((students) => {
    
    res.status(200).send ({ students});
    console.log(students)
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getUserById = () => {};

exports.postUser = () => {};

exports.removeUserById = () => {};

exports.patchUserById = () => {};