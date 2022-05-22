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

router.get('/index', clientController.client_index_get);

router.get('/clientPoints', clientController.client_points_get);
router.get('/pointsData', clientController.points_data_get);

router.post('/PUTA', multer().none(), clientController.client_make_sale_post);


module.exports = router;
