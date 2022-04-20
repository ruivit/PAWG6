var express = require('express');
var multer = require('multer');
var router = express.Router();


var adminController = require('../controllers/adminController');

// Admin portal
router.get('/', adminController.admin_index);

// Get the login page for the admin
router.get('/login', adminController.admin_login_get);

// Login process, admin or employee POST request
router.post('/login', multer().none(), adminController.admin_login_post);

// Logout process
router.get('/logout', adminController.logout);

// List the employees
router.get('/employees', adminController.employees);

// List the clients
router.get('/clients', adminController.clients);

// Form to create a employee
router.get('/employees/create', adminController.employees_create_get);

// POST request to create a employee
router.post('/employees/create',  multer().none(), adminController.employees_create_post);

router.post('/employees/delete/:id', multer().none(), adminController.employees_delete_post);

module.exports = router;

