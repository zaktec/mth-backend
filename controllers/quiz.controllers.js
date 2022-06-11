const {  selectQuizzes } =require('../models/quiz.models.js')

exports.getQuizzes = ( req, res) => {

selectQuizzes().then((quizzes) => {
    
    res.status(200).send ({ quizzes});
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getQuizById = () => {};

exports.postQuiz = () => {};

exports.removeQuizById = () => {};

exports.patchQuizById = () => {};