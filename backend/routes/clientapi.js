var express = require('express');
var multer = require('multer');
var router = express.Router();

var jwt = require('jsonwebtoken');

var clientAPIController = require('../controllers/clientAPIController');

// ------------------------------ Login/Logout Process
// Login Portal
router.get('/login', clientAPIController.client_login_get);

// Login Process
router.post('/login', multer().none(), clientAPIController.client_login_post);

// Logout
router.get('/logout', clientAPIController.client_logout);



// ------------------------------ Client Index

// Register a new client
router.get('/create', clientAPIController.client_create_get);
router.post('/create', multer().none(), clientAPIController.client_create_post);

// Profile
router.get('/profile', clientAPIController.client_profile_get);
router.post('/profile', multer().none(), clientAPIController.client_profile_post);

// Update password
router.get('/password', clientAPIController.client_updatepassword_get);
router.post('/password', multer().none(), clientAPIController.client_updatepassword_post);


// ------------------------------ Angular/ ---------------------------

// Get Books: https://localhost/clientapi/newbooks
// Search Books: https://localhost/clientapi/search/

// URL Angular/FrontEnd: http://localhost:4200/client/

router.get('/index', clientAPIController.client_index_get);

// Procurar livros 
//router.get('/search', clientAPIController.client_search_get);
//router.post('/search:id', multer().none(), clientAPIController.client_search_post);


// Vender um livro - nota, falta parte backend collecao temporario e acabar proposolas no admin
//router.get('/sellbook', clientAPIController.client_sell_get);


router.post('/sellbook', multer().none(), clientAPIController.client_sell_used_book_create_post);


// Comprar livros
//router.get('/buy', clientAPIController.client_buy_get);
//router.post('/buy', multer().none(), clientAPIController.client_buy_post);


module.exports = router;
