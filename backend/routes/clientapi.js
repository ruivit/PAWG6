var express = require('express');
var multer = require('multer');
var router = express.Router();

var jwt = require('jsonwebtoken');

var clientController = require('../controllers/clientAPIController');

// ------------------------------ Login/Logout Process
// Login Portal
router.get('/login', clientController.client_login_get);

// Login Process
router.post('/login', multer().none(), clientController.client_login_post);

// Logout
router.get('/logout', clientController.client_logout);



// ------------------------------ Client Index

// Register a new client
router.get('/create', clientController.client_create_get);
router.post('/create', multer().none(), clientController.client_create_post);

// Profile
router.get('/profile', clientController.client_profile_get);
router.post('/profile', multer().none(), clientController.client_profile_post);

// Update password
router.get('/password', clientController.client_updatepassword_get);
router.post('/password', multer().none(), clientController.client_updatepassword_post);


// ------------------------------ Angular/ ---------------------------

// Get Books: https://localhost/clientapi/newbooks
// Search Books: https://localhost/clientapi/search/

// URL Angular/FrontEnd: http://localhost:4200/client/

router.get('/index', clientController.client_index_get);

// Procurar livros 
//router.get('/search', clientController.client_search_get);
//router.post('/search:id', multer().none(), clientController.client_search_post);


// Vender um livro - nota, falta parte backend collecao temporario e acabar proposolas no admin
//router.get('/sellbook', clientController.client_sell_get);
//router.post('/sellbook', multer().none(), clientController.client_sell_post);


// Comprar livros
//router.get('/buy', clientController.client_buy_get);
//router.post('/buy', multer().none(), clientController.client_buy_post);


module.exports = router;
