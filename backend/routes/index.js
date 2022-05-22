var express = require('express');
var multer = require('multer');
var router = express.Router();


var Book = require('../models/bookModel');


/* GET home page. */
router.get('/', function (req, res, next) {  
    Book.find({}, function (err, books) {
        if (err) {
            res.redirect('error', { error: err });
        } else {
            res.status(200).json(books);
        }}).sort({ title: 1 });
});


module.exports = router;
