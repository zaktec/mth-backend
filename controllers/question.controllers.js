const {  selectQuestions } =require('../models/question.models.js')

exports.getQuestions = ( req, res) => {

selectQuestions().then((questions) => {
    
    res.status(200).send ({ questions});
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getQuestionById = () => {};

exports.postQuestion = () => {};

exports.removeQuestionById = () => {};

exports.patchQuestionById = () => {};