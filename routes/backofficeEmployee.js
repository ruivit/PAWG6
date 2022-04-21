var express = require('express');
var multer = require('multer');
var router = express.Router();

var controller = require('../controllers/backofficeControllerEmployee');

// employee Index
router.get('/', controller.backoffice_employee_get);


// ------------------------------ employee/Client URL

// employee Client Index
router.get('/employee/client', controller.backoffice_employee_client_get);

// employee Client Create
router.get('/employee/client/create', controller.backoffice_employee_client_get);
router.post('/employee/client/create', controller.backoffice_employee_client_post);

// employee Client Update
router.get('/employee/client/update/:id', multer().none(), controller.backoffice_employee_client_update_get);
router.post('/employee/client/update/:id', multer().none(), controller.backoffice_employee_client_update_post);

// employee Client Delete
router.post('/employee/client/delete/:id', controller.backoffice_employee_client_delete_post);


// ------------------------------ employee/Book URL

// employee Book Index
router.get('/employee/book', controller.backoffice_employee_book_get);

// employee Book Create
router.get('/employee/book/create', controller.backoffice_employee_book_create_get);
router.post('/employee/book/create', controller.backoffice_employee_book_create_post);

// employee Book Update
router.get('/employee/book/update/:id', multer().none(), controller.backoffice_employee_book_update_get);
router.post('/employee/book/update/:id', multer().none(), controller.backoffice_employee_book_update_post);

// employee Book Delete
router.post('/employee/book/delete/:id', controller.backoffice_employee_book_delete_post);


// ------------------------------ employee/Sale URL

// employee Sale Index
router.get('/employee/sale', controller.backoffice_employee_sale_get);

// employee Sale Create
router.get('/employee/sale/create', controller.backoffice_employee_sale_get);
router.post('/employee/sale/create', controller.backoffice_employee_sale_post);


module.exports = router;

