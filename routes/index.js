var express = require('express');
var multer = require('multer');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index/index');
});

module.exports = router;
