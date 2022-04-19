var express = require('express');
var router = express.Router();

// Necessario para "ver" o body que o form envia
// Se calhar ha outra opcao melhor..., mas esta funciona bem!
var multer = require('multer');

var adminController = require('../controllers/adminController');

router.get('/', adminController.admin_index);

router.get('/login', adminController.admin_login_get);

router.post('/login', multer().none(), adminController.admin_login_post);

router.get('/logout', adminController.logout);

router.get('/employees', adminController.employees);

router.get('/clients', adminController.clients);

router.get('/employees/create', adminController.employees_create_get);

router.post('/employees/create',  multer().none(), adminController.employees_create_post);

module.exports = router;

