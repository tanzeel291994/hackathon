var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
const key = require('../config/key');
var mongoose = require('mongoose');
//var User = require('../models/User');
var Notification = require('../models/Notification');
var Auth = require('../helpers/auth');



router.post('/Add', function (req, res, next) {
    var notification = new Notification({
        n_Title: req.body.n_Title,
        n_Description: req.body.n_Description,
        user:req.user._id///from cookies
    });
   
    notification.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        User.update({_id: mongoose.Types.ObjectId(req.user._id)}, {$push: {notification: mongoose.Types.ObjectId(result._id)}}, function (err, result2) {
            if (err) return res.send(err, 500);
            res.status(201).json({
              message: 'notification created',
              obj: result
          });
    });
});
});


router.get('/view/:id', function(req, res) {   
    Notification.find({user: req.user._id},function(err, Notification) {
    if (err)
    res.send(err)
    
    res.json(Notification);
    });
    
   });



  

module.exports = router;
