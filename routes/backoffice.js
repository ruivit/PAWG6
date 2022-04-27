var express = require('express');
var multer = require('multer');
var router = express.Router();

var controller = require('../controllers/backofficeController');

/* Se o cliente estiver logado, nem sequer deve ser permitido acessar a página de login do backend */

// Login Portal
router.get('/', controller.backoffice_login_get);

// Login process, admin or employee POST request
router.post('/login', multer().none(), controller.backoffice_login_post);

// Logout
router.get('/logout', controller.backoffice_logout);


module.exports = router;

