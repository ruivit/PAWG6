var express = require('express');
var multer = require('multer');
var router = express.Router();

var clientController = require('../controllers/clientController');


// Get the index page for the client
router.get('/', clientController.client_index);

// Get the login page for the client
router.get('/login', clientController.client_login);

// Login process, POST request
router.post('/login', multer().none(), clientController.client_login_post);

// Get the form to create a client
router.get('/create', clientController.client_create_get);

// POST request to create a client
router.post('/create', multer().none(), clientController.client_create_post);

// Logout process
router.get('/logout', clientController.client_logout);

// Delete a client POST request
router.post('/delete/:id', clientController.client_delete_post);

module.exports = router;

