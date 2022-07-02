const { selectTopics, insertTopic, selectTopicById } = require("../models/topic.models.js");

exports.getTopics = (req, res, next) => {
  const { sort_by } = req.query;


  
  selectTopics(sort_by)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
  // console.log(err)
};

exports.getTopicById = (req, res, next) => {
const { topic_id} = req.params;
console.log(topic_id)
selectTopicById (topic_id).then((topic)=> {
  res.status(200).send({topic})
  })
  .catch(next);
};

exports.postTopic = ( req, res, next ) => {
 // console.log(req.body)
  const topic = req.body;
  insertTopic(topic).then((topic) => {
    res.status(201).send({ topic})
  })
};

exports.removeTopicById = () => {};

exports.patchTopicById = () => {};
