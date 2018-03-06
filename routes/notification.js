var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Notification = require('../models/Notification');


router.post('/Notify', function (req, res, next) {
    var notification = new Notification({
        n_Title: req.body.n_Title,
        n_Description: req.body.n_Description,
      
    });
   
    notification.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            
            message: 'Notification Added',
            obj: result
            
        });
    });
});

router.get('/view/', function(req, res) {
   
    Notification.find(function(err, Notification) {
    if (err)
    res.send(err)
    
    res.json(user);
    });
    
   });