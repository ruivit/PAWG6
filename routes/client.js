var express = require('express');
var router = express.Router();

var multer = require('multer');

var clientController = require('../controllers/clientController');

// Get the index page for the client
router.get('/', clientController.client_index);

router.get('/login', multer().none(), clientController.client_login);

router.get('/create', clientController.client_create_get);

router.post('/create', multer().none(), clientController.client_create_post);


module.exports = router;

