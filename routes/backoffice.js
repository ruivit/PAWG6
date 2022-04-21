var express = require('express');
var multer = require('multer');
var router = express.Router();

var backofficeController = require('../controllers/backofficeController');

// Login Portal
router.get('/', backofficeController.backoffice_login_get);

// Login process, admin or employee POST request
router.post('/admin/login', multer().none(), backofficeController.backoffice_login_post);

// Logout
router.post('/admin/logout', backofficeController.backoffice_logout);



// Admin Index
router.get('/admin', backofficeController.backoffice_admin_get);

// ------------------------------ Admin/Employee URL

// Admin Employee Index
router.get('/admin/employee', backofficeController.backoffice_admin_employee_get);

// Admin Employee Create
router.get('/admin/employee/create', backofficeController.backoffice_admin_employee_create_get);
router.post('/admin/employee/create', multer().none(), backofficeController.backoffice_admin_employee_create_post);

// Admin Employee Update
router.get('/admin/employee/update/:id', multer().none(), backofficeController.backoffice_admin_employee_update_get);
router.post('/admin/employee/update/:id', multer().none(), backofficeController.backoffice_admin_employee_update_post);

// Admin Employee Delete
router.post('/admin/employee/delete/:id', multer().none(), backofficeController.backoffice_admin_employee_delete_post);


// ------------------------------ Admin/Client URL

// Admin Client Index
router.get('/admin/client', backofficeController.backoffice_admin_client_get);

// Admin Client Create
router.get('/admin/client/create', backofficeController.backoffice_admin_client_create_get);
router.post('/admin/client/create', multer().none(), backofficeController.backoffice_admin_client_create_post);

// Admin Client Update
router.get('/admin/client/update/:id', multer().none(), backofficeController.backoffice_admin_client_update_get);
router.post('/admin/client/update/:id', multer().none(), backofficeController.backoffice_admin_client_update_post);

// Admin Client Delete
router.post('/admin/client/delete/:id', multer().none(), backofficeController.backoffice_admin_client_delete_post);


// ------------------------------ Admin/Book URL

// Admin Book Index
router.get('/admin/book', backofficeController.backoffice_admin_book_get);

// Admin Book Create
router.get('/admin/book/create', backofficeController.backoffice_admin_book_create_get);
router.post('/admin/book/create', multer().none(), backofficeController.backoffice_admin_book_create_post);

// Admin Book Update
router.get('/admin/book/update/:id', multer().none(), backofficeController.backoffice_admin_book_update_get);
router.post('/admin/book/update/:id', multer().none(), backofficeController.backoffice_admin_book_update_post);

// Admin Book Delete
router.post('/admin/book/delete/:id', multer().none(), backofficeController.backoffice_admin_book_delete_post);


// ------------------------------ Admin/Sale URL

// Admin Sale Index
router.get('/admin/sale', backofficeController.backoffice_admin_sale_get);

// Admin Sale Create
router.get('/admin/sale/create', backofficeController.backoffice_admin_sale_get);
router.post('/admin/sale/create', multer().none(), backofficeController.backoffice_admin_sale_post);


module.exports = router;

