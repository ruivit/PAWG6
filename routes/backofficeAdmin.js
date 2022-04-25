var express = require('express');
var multer = require('multer');
var router = express.Router();

var controller = require('../controllers/backofficeControllerAdmin');


// Admin Index
router.get('/', controller.backoffice_admin_get);

// ------------------------------ /Backoffice/Admin/Employee URL

// Admin Employee Index
router.get('/employee', controller.backoffice_admin_employee_get);

// Admin Employee Create
router.get('/employee/create', controller.backoffice_admin_employee_create_get);
router.post('/employee/create', multer().none(), controller.backoffice_admin_employee_create_post);

// Admin Employee Update
router.get('/employee/update/:id', multer().none(), controller.backoffice_admin_employee_update_get);
router.post('/employee/update', multer().none(), controller.backoffice_admin_employee_update_post);

// Admin Employee Delete
router.post('/employee/delete/:id', multer().none(), controller.backoffice_admin_employee_delete_post);


// ------------------------------ /Backoffice/Admin/Client URL

// Admin Client Index
router.get('/client', controller.backoffice_admin_client_get);

// Admin Client Create
router.get('/client/create', controller.backoffice_admin_client_create_get);
router.post('/client/create', multer().none(), controller.backoffice_admin_client_create_post);

// Admin Client Update
router.get('/client/update/:id', multer().none(), controller.backoffice_admin_client_update_get);
router.post('/client/update', multer().none(), controller.backoffice_admin_client_update_post);

// Admin Client Delete
router.post('/client/delete/:id', multer().none(), controller.backoffice_admin_client_delete_post);


// ------------------------------ Admin/Book URL

// Admin Book Index
router.get('/book', controller.backoffice_admin_book_get);

// Admin Book Create
router.get('/book/create', controller.backoffice_admin_book_create_get);
router.post('/book/create', multer().none(), controller.backoffice_admin_book_create_post);

// Admin Book Update
router.get('/book/update/:id', multer().none(), controller.backoffice_admin_book_update_get);
router.post('/book/update', multer().none(), controller.backoffice_admin_book_update_post);

// Admin Book Delete
router.post('/book/delete/:id', multer().none(), controller.backoffice_admin_book_delete_post);

router.post('/book/search', multer().none(), controller.backoffice_admin_book_search_post);

// ------------------------------ Admin/Sale URL

// Admin Sale Index
router.get('/sale', controller.backoffice_admin_sale_get);

// Admin Sale Create
router.get('/sale/create', controller.backoffice_admin_make_sale_get);
router.post('/sale/create', multer().none(), controller.backoffice_admin_make_sale_post);

// ------------------------------ Admin/Points URL

router.get('/managePoints', controller.backoffice_admin_managepoints_get);

router.post('/managePoints', multer().none(), controller.backoffice_admin_managepoints_post);

router.get('/manageDiscount', controller.backoffice_admin_managediscount_get);

router.post('/manageDiscount', multer().none(), controller.backoffice_admin_managediscount_post);

module.exports = router;

