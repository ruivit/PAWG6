var express = require('express');
var multer = require('multer');
var router = express.Router();

var controller = require('../controllers/backofficeControllerEmployee');

// employee Index
router.get('/', controller.backoffice_employee_get);


// ------------------------------ employee/Client URL

// employee Client Index
router.get('/client', controller.backoffice_employee_client_get);

// employee Client Create
router.get('/client/create', controller.backoffice_employee_client_create_get);
router.post('/client/create', multer().none(), controller.backoffice_employee_client_create_post);

// employee Client Update
router.get('/client/update/:id', multer().none(), controller.backoffice_employee_client_update_get);
router.post('/client/update/:id', multer().none(), controller.backoffice_employee_client_update_post);

// employee Client Delete
router.post('/client/delete/:id', controller.backoffice_employee_client_delete_post);

//employee Client search
router.post('/client/search', multer().none(), controller.backoffice_employee_client_search_post);



// ------------------------------ employee/Book URL

// employee Book Index
router.get('/book', controller.backoffice_employee_book_get);

// employee Book Create
router.get('/book/create', controller.backoffice_employee_book_create_get);
router.post('/book/create', multer().none(), controller.backoffice_employee_book_create_post);

// employee Book Update
router.get('/book/update/:id', multer().none(), controller.backoffice_employee_book_update_get);
router.post('/book/update/:id', multer().none(), controller.backoffice_employee_book_update_post);

// employee Book Delete
router.post('/book/delete/:id', controller.backoffice_employee_book_delete_post);

router.post('/book/search', multer().none(), controller.backoffice_employee_book_search_post);

// ------------------------------ employee/Sale URL

// employee Sale Index
router.get('/sales', controller.backoffice_employee_sale_get);

// employee Sale Create
router.get('/sales/makeSale', controller.backoffice_employee_make_sale_get);
router.post('/sales/makeSale', multer().none(), controller.backoffice_employee_make_sale_post);

module.exports = router;

// ------------------------------ employee/ProfileUpdate URL

// Employee Profile Update
router.get('/profile', controller.backoffice_employee_manageProfile_get);

router.get('/profile/update/', controller.backoffice_employee__profile_update_get);

router.post('/profile/update', multer().none(), controller.backoffice_employee_profile_update_post);

