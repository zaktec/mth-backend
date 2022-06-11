const {  selectLessons } =require('../models/lesson.models.js')

exports.getLessons = ( req, res) => {

selectLessons().then((lessons) => {
    res.status(200).send({ lessons});
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getlessonById = () => {};

exports.postLesson = () => {};

exports.removeLessonById = () => {};

exports.patchLessonById = () => {};