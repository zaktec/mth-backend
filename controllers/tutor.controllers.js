const {  selectTutors, 
         selectTutorById, 
         insertTutor,
        deleteTutorById,
        updateTutorById


} =require('../models/tutor.models.js');
const { checkTutorExists } = require('../utils/utils.js');

exports.getTutors = async( req, res, next) => {
const { sort_by } = req.query;
  try {
    const tutors = await selectTutors(sort_by);
      res.status(200).send ({tutors});
  } catch (err) {
    next(err)    
  }
};

exports.getTutorById = (req, res, next) => {
const { tutor_id } =req.params;


return checkTutorExists (tutor_id) 
.then((topicExist)=>{
  if(topicExist)  {
    return selectTutorById(tutor_id).then((tutor) => {
      res.status(200).send({ tutor });
    });
  } else {
    return Promise.reject({ status: 404, msg: "Not found" });
  }
})
.catch((err) => {
  next(err);
});
};


exports.postTutor = (req, res, next) => {
  const tutor = req.body;
  insertTutor(tutor)
    .then((tutor) => {
      res.status(201).send({ tutor });
    })
    .catch((err) => {
      next(err);
    });

};

exports.removeTutorById = (req, res, next) => {
  const { tutor_id } = req.params;

  deleteTutorById(tutor_id)
    .then((deletedTutor) => {
      if (deletedTutor) {
        res.sendStatus(204);
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });



};

exports.patchTutorById = (req, res, next) => {
  const tutor = req.body;
  const { tutor_id } = req.params;
  // console.log(course_id, course)
  return updateTutorById(tutor, tutor_id)
    .then((updatedTutor) => {
      if (updatedTutor) {
        res.status(200).send({ updatedTutor });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      // console.log(err)
      next(err);
    });
};