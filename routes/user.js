var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const key = require('../config/key');
var mongoose = require('mongoose');
var _ = require('lodash');
//var upload = require('../helpers/upload');
var Post = require('../models/Post');
var User = require('../models/User');
var Auth = require('../helpers/auth');


//tested
router.post('/signup', function (req, res, next) {
    var user = new User({
        //firstName: req.body.firstName,
        //lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    console.log(user);
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

//tested
router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user},'secret', {expiresIn: 7200});
        res.cookie('tracker',token);
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});


router.get('/u/:userId', function(req, res, next) {
    User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, function (err, user) {
      if (err || ! user) return res.redirect('/');
      var edit = (req.user && user.id == req.user.id);
  
      Post.paginate({user: mongoose.Types.ObjectId(req.params.userId)},{ page: 1, limit: 5 }, function (err, posts) {
        if (err || ! user) return res.redirect('/');
        User.find({_id: {$in: user.following}}, function (err, users) {
          User.find({following: user._id}, function (err, followers) {
            Album.find({user: user._id}).sort({created_at: -1}).populate('photos').exec(function (err, albums) {
              return res.render('profile.html', {user: req.user, posts: posts, profileUser: user, edit: edit, followingUsers: users, followers: followers, albums: albums});
            });
          });
        });
      });
    });
  });


//tested
router.put('/update', function(req, res) {
    // create mongose method to update a existing record into collection
    let id = req.user._id;
    //console.log(id);
    var data = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        location : req.body.location,
        occupation : req.body.occupation,
        qualification : req.body.qualification,
        gender : req.body.gender,
        intrests : req.body.intrests,
        language : req.body.language,
        status : req.body.status,
        yob : req.body.yob,
        field : req.body.field,
        intrestInfo:req.body.intrestInfo

    }
    //console.log(data);
   User.findByIdAndUpdate(id, {profile:data},{new: true}, function(err, user) {
    if (err) throw err;
    //res.send('Successfully! user updated - '+user);
    res.json(user);
    });
});

//tested
router.post('/createProfile', function(req, res) {
    // create mongose method to update a existing record into collection
    let id = req.body.userId;
    console.log(id);
    var data = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        location : req.body.location,
        occupation : req.body.occupation,
        qualification : req.body.qualification,
        gender : req.body.gender,
        intrests : req.body.intrests,
        language : req.body.language,
        status : req.body.status,
        yob : req.body.yob,
        field : req.body.field,
        intrestInfo:req.body.intrestInfo

    }
    //console.log(data);
   User.findByIdAndUpdate(id, {profile:data},{new: true}, function(err, user) {
    if (err) throw err;
    //res.send('Successfully! user updated - '+user);
    res.json(user);
    });
});

//tested
router.get('/my-profile/', function(req, res) {
    let id = req.user._id;
    if(id == null)
    res.status(404).json({
        message: 'Not found'
    });
    User.findById(id, function(err, user) {
    if (err)
    res.send(err)
    
    res.status(200).json({
        obj: user
    });
    });
    
   });
//tested 

router.post('/follow', function (req, res) {   //id: the one who is been followed 
 //Also need to add an entry in notifications here.
 console.log(req.body.userId);
     User.update({_id: mongoose.Types.ObjectId(req.user._id)}, {$push: {following: mongoose.Types.ObjectId(req.body.userId)}}, function (err, result1) {
        if (err) return res.send(err, 500);
        User.update({_id: mongoose.Types.ObjectId(req.body.userId)}, {$push: {followers: mongoose.Types.ObjectId(req.user._id)}}, function (err, result) {
            if (err) return res.send(err, 500);
            res.status(201).json({
              message: 'followed',
              obj: result1
          });
          });    
      });
      });
//tested
      router.post('/unfollow', function (req, res) {   //id: the one who is been followed 
        //Also need to add an entry in notifications here.
        console.log(req.body.userId);
            User.update({_id: mongoose.Types.ObjectId(req.user._id)}, {$pull: {following: mongoose.Types.ObjectId(req.body.userId)}}, function (err, result1) {
               if (err) return res.send(err, 500);
               User.update({_id: mongoose.Types.ObjectId(req.body.userId)}, {$pull: {followers: mongoose.Types.ObjectId(req.user._id)}}, function (err, result) {
                   if (err) return res.send(err, 500);
                   res.status(201).json({
                     message: 'unfollowed',
                     obj: result1
                 });
                 });    
             });
             });

  //tested
  router.get('/search-user/:term', Auth.authRedirect, function (req, res) {
    if (! req.params.term) return res.send([], 500);
    var nameRegex = new RegExp(req.params.term, 'ig');
   //var nameRegex=req.params.term;
   User.find({ $or : [{"profile.firstName": nameRegex, _id: {$ne: req.user._id}},
    {"profile.intrests":nameRegex,_id: {$ne: req.user._id}},
    {"profile.occupation":nameRegex,_id: {$ne: req.user._id}},
    {"profile.location":nameRegex,_id: {$ne: req.user._id}}
    ]}
    , function (err, users) {
      if (err) return res.send(err, 500);
      res.status(201).json({
        userId: req.user._id,
        obj: users
    });
    });
  });
  
  //tested
  router.get('/whotoFollow/', function (req, res) {
    if (! req.user._id) return res.send([], 500);
    User.findById(req.user._id, function(err, user) {
        if (err) res.send(err)
        User.find({ $or : [
        {$and:[{"profile.intrests":user.profile.intrests[0]},{_id: {$ne: req.user._id}},{followers:{$ne:mongoose.Types.ObjectId( req.user._id)}}]},
        {$and:[{"profile.intrests":user.profile.intrests[1]},{_id: {$ne: req.user._id}},{followers:{$ne: mongoose.Types.ObjectId(req.user._id)}}]}, //could be done better
        {$and:[{"profile.location":user.profile.location},{_id: {$ne: req.user._id}},{followers:{$ne: mongoose.Types.ObjectId(req.user._id)}}]}
        ]}
        , function (err, users) {
          if (err) return res.send(err, 500);
          res.status(201).json({
            userId: req.user._id,
            obj: users
        });
        
    });
});
  });
 

  
 
module.exports = router;


/*
router.post('/update1/:email', function (req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (user) {
            User.update({_id: mongoose.Types.ObjectId(req.params.id)}, {profile: req.body}, function (err, result) {
                if (err) return res.send(err, 500);
                return res.send(result);
              });
        }
   
  });
});



 router.put('/follows/:id', function(req, res) {
    // create mongose method to update a existing record into collection
    let id = req.params.id;
    var email= req.body.email;
  
    // save the user
   User.findByIdAndUpdate(id,following[{email}] ,{new: true}, function(err, user) {
    if (err) throw err;

    res.send('Successfully! user updated');
    });
   });

    */
