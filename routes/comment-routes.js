const express = require('express');
const commentsRoutes = express.Router();

// Require Post model in our routes module
let CommentsModel = require('../model/comment-model.js');

// Defined get data(index or listing) route
commentsRoutes.route('/comments/:pid').get(function (req, res) {
    console.log("comment", req.params.pid);
    CommentsModel.find({"product": {$eq:req.params.pid}}, function(err, comments){
    if(err){
      res.json(err);
    }
    else {
      res.json(comments);
    }
  });
});


module.exports = commentsRoutes;