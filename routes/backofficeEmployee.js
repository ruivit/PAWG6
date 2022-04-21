var express = require('express');
var multer = require('multer');
var router = express.Router();

var backofficeController = require('../controllers/backofficeController');

// Login Portal
router.get('/', backofficeController.backoffice_login_get);

// Login process, employee or employee POST request
router.post('/login', multer().none(), backofficeController.backoffice_login_post);

// Logout
router.post('/logout', backofficeController.backoffice_logout);



// employee Index
router.get('/employee', backofficeController.backoffice_employee_get);


// ------------------------------ employee/Client URL

// employee Client Index
router.get('/employee/client', backofficeController.backoffice_employee_client_get);

// employee Client Create
router.get('/employee/client/create', backofficeController.backoffice_employee_client_get);
router.post('/employee/client/create', backofficeController.backoffice_employee_client_post);

// employee Client Update
router.get('/employee/client/update/:id', multer().none(), backofficeController.backoffice_employee_client_update_get);
router.post('/employee/client/update/:id', multer().none(), backofficeController.backoffice_employee_client_update_post);

// employee Client Delete
router.post('/employee/client/delete/:id', backofficeController.backoffice_employee_client_delete_post);


// ------------------------------ employee/Book URL

// employee Book Index
router.get('/employee/book', backofficeController.backoffice_employee_book_get);

// employee Book Create
router.get('/employee/book/create', backofficeController.backoffice_employee_book_create_get);
router.post('/employee/book/create', backofficeController.backoffice_employee_book_create_post);

// employee Book Update
router.get('/employee/book/update/:id', multer().none(), backofficeController.backoffice_employee_book_update_get);
router.post('/employee/book/update/:id', multer().none(), backofficeController.backoffice_employee_book_update_post);

// employee Book Delete
router.post('/employee/book/delete/:id', backofficeController.backoffice_employee_book_delete_post);


// ------------------------------ employee/Sale URL

// employee Sale Index
router.get('/employee/sale', backofficeController.backoffice_employee_sale_get);

// employee Sale Create
router.get('/employee/sale/create', backofficeController.backoffice_employee_sale_get);
router.post('/employee/sale/create', backofficeController.backoffice_employee_sale_post);


module.exports = router;

