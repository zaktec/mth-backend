const express = require('express');
const { getArticleById,
     patchArticleByVotes, 
     getArticles,
     getCommentsByArticleId,
     postCommentByArticleId
} = require('../controllers/articles.controllers');
const articleRouter = express.Router();

// everything starts with /api/articles 

//GET /api/articles
articleRouter.route('/')
.get(getArticles);


articleRouter.route('/:article_id')
//GET /api/articles/:article_id
.get(getArticleById)

//PATCH /api/articles/:article_id
.patch(patchArticleByVotes);


articleRouter.route('/:article_id/comments')
//GET /api/articles/:article_id/comments
.get(getCommentsByArticleId)
//POST /api/articles/:article_id/comments
.post(postCommentByArticleId)

module.exports = articleRouter;