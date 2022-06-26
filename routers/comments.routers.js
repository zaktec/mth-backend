const express =require('express');
const commentRouter = express.Router();
const { deleteComment } = require ('../controllers/comments.controllers')

// DELETE /api/comments/:comment_id

commentRouter.delete('/:comment_id', deleteComment)

module.exports = commentRouter;