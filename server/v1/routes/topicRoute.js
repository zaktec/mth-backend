const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getTopics,
    postTopic,
    getTopicById,
    updateTopicById,
    deleteTopicById,
} = require('../modules/topics/topicController');

const router = Router();
router
    .get('/get-topics', userAuthorization(['admin']), getTopics)
    .post('/post-topic', userAuthorization(['admin']), postTopic)
    .get('/get-topics/:topic_id', userAuthorization(['admin']), getTopicById)
    .patch('/update-topics/:topic_id', userAuthorization(['admin']), updateTopicById)
    .delete('/delete-topics/:topic_id', userAuthorization(['admin']), deleteTopicById);

module.exports = router;
