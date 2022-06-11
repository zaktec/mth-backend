const {  selectTopics } =require('../models/topic.models.js')

exports.getTopics = ( req, res) => {

selectTopics().then((topics) => {
    //console.log(courses)
    res.status(200).send ({ topics});
  })
  .catch((err) => {
    console.log(err)

  })
};

exports.getTopicById = () => {};

exports.postTopic = () => {};

exports.removeTopicById = () => {};

exports.patchTopicById = () => {};