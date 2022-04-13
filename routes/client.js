var express = require('express');
var router = express.Router();

var clientController = require('../controllers/clientController');

// Get the index page for the client
router.get('/', clientController.client_index);

router.get('/login', clientController.client_login);

router.get('/create', clientController.client_create_get);

router.post('/create', clientController.client_create_post);


module.exports = router;

