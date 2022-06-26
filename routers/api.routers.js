const express = require('express');
const topicRouter = require('./topics.routers')
const articleRouter = require('./articles.routers')
const commentRouter =require('./comments.routers')
const {
getEndpoints,
sendWelcomeMessage
} =require('../controllers/start.controllers')


const apiRouter = express.Router();

// everything starts with api 


//GET /api sends back endpoint 
apiRouter.get('/', getEndpoints)
apiRouter.get('/welcome', sendWelcomeMessage)


apiRouter.use('/topics', topicRouter)

apiRouter.use('/articles', articleRouter)

apiRouter.use('/comments', commentRouter)

module.exports = apiRouter;
