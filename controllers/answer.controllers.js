const {  selectAnswers } =require('../models/answer.models.js')

exports.getAnswers = ( req, res) => {

selectAnswers().then((answers) => {
    
    res.status(200).send ({ answers});
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getAnswerById = () => {};

exports.postAnswer = () => {};

exports.removeAnswerById = () => {};

exports.patchAnswerById = () => {};