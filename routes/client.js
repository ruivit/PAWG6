var express = require('express');
var router = express.Router();

var multer = require('multer');

var clientController = require('../controllers/clientController');
var bookController = require('../controllers/bookController');

// Get the index page for the client
router.get('/', clientController.client_index);

router.get('/login', clientController.client_login);

router.post('/login', multer().none(), clientController.client_login_post);

router.get('/create', clientController.client_create_get);

router.post('/create', multer().none(), clientController.client_create_post);

router.get('/logout', clientController.client_logout);

router.get('/new', bookController.new_books);

module.exports = router;

