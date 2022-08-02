const {  selectTutors } =require('../models/tutor.models.js')

exports.getTutors = ( req, res) => {

  
selectTutors().then((tutors) => {
    
    res.status(200).send ({tutors});
    console.log(tutors)
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getUserById = () => {};

exports.postUser = () => {};

exports.removeUserById = () => {};

exports.patchUserById = () => {};