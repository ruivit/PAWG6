var express = require('express');
var multer = require('multer');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index/index');
});

module.exports = router;
