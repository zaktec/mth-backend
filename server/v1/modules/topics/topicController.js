/**
 * This topicController contains 5 functions required to handle
 * getTopics
 * getTopicById
 * postTopic
 * deleteTopicById
 * updateTopicById
 */

const {
  insertTopic,
  selectTopics,
  selectTopicById,
  deleteTopicById,
  updateTopicById,
  checkTopicExists,
} = require('./topicModel');



/**
 * Get list of topics
 * @param {string} req sort_by request
 * @param {object} res data response - topic_unit, topic_name, topic_code, topic_desc, topic_level, topic_course_fk_id 
 * 
 */

exports.getTopics = async (req, res, next) => {
  try {
  const { sort_by } = req.query;
    const data = await selectTopics(sort_by);
    res.status(200).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * serves a topic object when an id is given
 * @param {int} req course_id request
 * @param {object} res data response - topic_unit, topic_name, topic_code, topic_desc, topic_level, topic_course_fk_id 
 */

exports.getTopicById = async (req, res, next) => {
  try {
  const { topic_id } = req.params;

  const topicExist = await checkTopicExists(topic_id)
      if (topicExist) {
        const data = await  selectTopicById(topic_id)
          res.status(200).send({ data });
      } else {
        res.status(400).send({ message: 'Invalid Input' });
      }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Register new topic
 * @param {object} req body request
 * @param {object} res data response - topic_unit, topic_name, topic_code, topic_desc, topic_level, topic_course_fk_id 
 */

exports.postTopic = async (req, res, next) => {
  try {
  const topic = req.body;
  const data = await insertTopic(topic)
      res.status(201).send({ data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Delete the Course with id given
 * @param {int} req course_id request
 * @param {object} res message response 
 * 
 */

exports.deleteTopicById = async (req, res, next) => {
  try {
  const { topic_id } = req.params;

 const data =  await deleteTopicById(topic_id)
      if (data) {
        res.sendStatus(204);
      } else {
        res.status(400).send({ message: 'Invalid Input' });
      }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};

/**
 * Update the topic with id given
 * @param {int} req course_id request
 * @param {object} res data response - topic_unit, topic_name, topic_code, topic_desc, topic_level, topic_course_fk_id 
 * 
 */

exports.updateTopicById = async (req, res, next) => {
  try {
  const topic = req.body;
  const { topic_id } = req.params;
const data = await updateTopicById(topic, topic_id)
      if (data) {
        res.status(200).send({ data });
      } else {
        res.status(400).send({ message: 'Invalid Input' });
      }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.toString(),
    });
  }
};
