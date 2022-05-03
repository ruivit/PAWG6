var express = require('express');
var multer = require('multer');
var router = express.Router();

var jwt = require('jsonwebtoken');

var clientController = require('../controllers/clientController');

router.use(function (req, res, next) {
    const token = req.cookies.token;

    if (token == null) return res.redirect('/client/login');

    jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
        if (err) return res.render('error/error', { error: err });

        if (req.session.client) {
            next();

        } else {
            return res.status(200).redirect('/');
        }
    });
});

// ------------------------------ Login/Logout Process
// Login Portal
router.get('/login', clientController.client_login_get);

// Login Process
router.post('/login', multer().none(), clientController.client_login_post);

// Logout
router.get('/logout', clientController.client_logout);


// ------------------------------ Client Index

// Client Portal - after login
router.get('/', clientController.client_index_get);


// Register a new client
router.get('/create', clientController.client_create_get);
router.post('/create', multer().none(), clientController.client_create_post);

// Sell a book
router.get('/sellbook', clientController.client_sell_get);
router.post('/sellbook', multer().none(), clientController.client_sell_post);

// Profile
router.get('/profile', clientController.client_profile_get);
router.post('/profile', multer().none(), clientController.client_profile_post);

module.exports = router;
