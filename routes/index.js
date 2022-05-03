var express = require('express');
var multer = require('multer');
var router = express.Router();

var Book = require('../models/bookModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index/index');
});

// dar fix nisto
router.get('/search', async function (req, res, next) {
  var perPage = 10;
  var total = await Book.countDocuments();
  var totalPages = Math.ceil(total / perPage);
  var currentPage = req.query.page || 1;
  var start = (currentPage - 1) * perPage;
  var lastPage = start + perPage;

  // convert currentPage to integer
  currentPage = parseInt(currentPage);

  var books = await Book.find().skip(start).limit(perPage);
  res.render('index/searchBook', { books: books, totalPages: totalPages, currentPage: currentPage });
});

module.exports = router;
