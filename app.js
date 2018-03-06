var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const db = require('./config/db');
const key = require('./config/key');
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user'); 
var postRoutes = require('./routes/post');
var User = require('./models/user');
//const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var app = express();
var jwt = require('jsonwebtoken');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//database connection
mongoose.connect('mongodb://localhost:27017/we_connect');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    jwt.verify(req.cookies.tracker, key.secret, function (err, decoded) {
      if (! err && decoded) {
        // console.log(decoded.user.email);
        User.findOne({email: decoded.user.email}, function (err, user) {
          if (! err && user) {req.user = user;
        //console.log(req.user);
        }
          next()
        })
        return
      }
      next()
    })
  })
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
