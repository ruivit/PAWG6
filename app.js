var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');

require('dotenv').config();

var app = express();

app.use('/favicon.ico', express.static('public/images/favicon.ico'));

// MongoDB
//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection using dotenv
var mongoDB = process.env.MONGOURL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, '[[[ ERROR ]]] MongoDB connection error:'));
db.on('connected', console.log.bind(console, '[OK] MongoDB connection sucess'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

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


// ----------------------- Routes -----------------------
var indexRouter = require('./routes/index');
var backofficeRouter = require('./routes/backoffice');
var backofficeAdminRouter = require('./routes/backofficeAdmin');
var backofficeEmployeeRouter = require('./routes/backofficeEmployee');
var clientRouter = require('./routes/client');

app.use('/', indexRouter);
app.use('/backoffice', backofficeRouter);
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
