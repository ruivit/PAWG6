var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

app.use('/favicon.ico', express.static('public/images/favicon.ico'));

// MongoDB
//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://mongoadm:AxPAi0GHVVvhijYU@cluster.yharo.mongodb.net/pawm1';
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
var adminRouter = require('./routes/admin');
var clientRouter = require('./routes/client');
var bookRouter = require('./routes/book');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/book', bookRouter);
// -----------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error/404');
});

module.exports = app;
