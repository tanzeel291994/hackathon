var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const key = require('../config/key');
var mongoose = require('mongoose');
var _ = require('lodash');
//var upload = require('../helpers/upload');
var Post = require('../models/Post');
var User = require('../models/User');
var Auth = require('../helpers/auth');

//tested
router.get('/', function(req, res, next) {
  if (!req.user) {
      return res.send("Please login again");
  }
  var ids = req.user.following;
  ids.push(req.user._id); //allows you to see your own posts
  Post.find({user: {$in: ids}}).populate('user').sort({created_at: -1}).exec(function (err, posts) {
      if (err) return res.send(err);
      res.status(200).json({
          message: 'Success',
          obj: {posts:posts}
      });
  });
});

//tested
router.post('/add',Auth.authJson ,function (req, res,next) {
 //console.log(User);
 //var post = new Post(postData(req.body));
    var post = new Post({
      title: req.body.title,
      type: req.body.type,
      text:req.body.text,
      user:req.user._id///from cookies
  });
 
  post.save(function(err, result) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
  console.log(result);
  User.update({_id: mongoose.Types.ObjectId(req.user._id)}, {$push: {posts: mongoose.Types.ObjectId(result._id)}}, function (err, result2) {
        if (err) return res.send(err, 500);
        res.status(201).json({
          message: 'post created',
          obj: result
      });
      });  
  });
});

router.post('/:id/like', function (req, res, next) {
  Post.update({_id: mongoose.Types.ObjectId(req.params.id)}, {$push: {likes: mongoose.Types.ObjectId(req.body.user)}}, function (err, result) {
    if (err) return res.send(err, 500);
    return res.send(result);
  });
});
  
/*

  router.delete('/:id', key, function (req, res) {
    Post.find({_id: mongoose.Types.ObjectId(req.params.id)}).remove(function (err, result) {
      if (err) return res.send(err, 500);
      return res.send(result);
    });
  });


  router.post('/photo', key, upload.single('file'), function (req, res) {
    var post = new Post({
      text: req.body.text,
      link: '/f/' + req.file.filename,
      type: 2,
      user: req.user._id
    });
    post.save(function (err, post) {
      if (err || ! post) return res.send(err, 500);
      return res.send(post);
    });
  });


  router.post('/video', key, function (req, res) {
    var post = new Post({
      text: req.body.text,
      link: req.body.link,
      type: 3,
      user: req.user._id
    });
    post.save(function (err, post) {
      if (err || ! post) return res.send(err, 500);
      return res.send(post);
    });
  });


  router.post('/:id/actions/like', function (req, res, next) {
    Post.update({_id: mongoose.Types.ObjectId(req.params.id)}, {$push: {likes: mongoose.Types.ObjectId(req.body.user)}}, function (err, result) {
      if (err) return res.send(err, 500);
      return res.send(result);
    });
  });
  router.post('/:id/actions/un-like', function (req, res, next) {
    Post.update({_id: mongoose.Types.ObjectId(req.params.id)}, {$pullAll: {likes: [mongoose.Types.ObjectId(req.body.user)]}}, function (err, result) {
      if (err) return res.send(err, 500);
      return res.send(result);
    });
  });

  
  router.put('/:id', function (req, res, next) {
    Post.update({_id: mongoose.Types.ObjectId(req.params.id)}, {$set: Object.assign(req.body, {trending_at: Date.now()})}, function (err, result) {
      if (err) return res.send(err, 500);
      return res.send(result);
    });
  });
   */
  function postData (post) {
    post.user = mongoose.Types.ObjectId(post.user);
    return post;
  }
  
  module.exports = router;
 