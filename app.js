var express = require('express');
var createError = require('http-errors');

// Session related
var session = require('express-session');
var cookieParser = require('cookie-parser');

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// Multer Middleware and DB
var multer = require('multer');
var mongoose = require('mongoose');

// Image related
var fs = require('fs');
var path = require('path');


// Dotenv config
require('dotenv').config();

var app = express();

// Icons and bootstrap
app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// MongoDB Config
var mongoDB = process.env.MONGOURL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var dbconn = mongoose.connection;

dbconn.on('error', console.error.bind(console, '[[[ ERROR ]]] MongoDB connection error:'));
dbconn.on('connected', console.log.bind(console, '[OK] MongoDB connection sucess'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Get JSON DATA
app.use(express.json());
// Get FORM DATA
app.use(express.urlencoded({ extended: true }));

// Session related
app.use(session({
  secret: 'dskma92847ya7wyd0awd',
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());

// Use the public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the public/images/books folder to serve static files of books
app.use('/images/books', express.static(path.join(__dirname, 'public/images/books')));

// ----------------------- Routes -----------------------
var indexRouter = require('./routes/index');
var authBackofficeRouter = require('./routes/authBackoffice');
var backofficeAdminRouter = require('./routes/backofficeAdmin');
var backofficeEmployeeRouter = require('./routes/backofficeEmployee');
var clientRouter = require('./routes/client');

app.use('/', indexRouter);
app.use('/backoffice', authBackofficeRouter);
app.use('/backoffice/admin', backofficeAdminRouter);
app.use('/backoffice/employee', backofficeEmployeeRouter);
app.use('/client', clientRouter);
// -----------------------------------------------------

// catch 404 and 500 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  next(createError(500));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page if 404 or 500
  if (err.status === 404) {
    res.status(404).render('error/404');
  }
  else if (err.status === 500) {
    res.status(500).render('error/error');
  } else {
    res.status(err.status || 500);
    res.render('error/error');
  }
});

module.exports = app;
