var express = require('express');
const req = require('express/lib/request');
var multer = require('multer');
var router = express.Router();
var jwt = require('jsonwebtoken');

var controller = require('../controllers/backofficeControllerAdmin');


router.use(function (req, res, next) {    
    var token = req.cookies.token;
    if (!token) {
        res.status(302).redirect('/');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.render('error', { error: err });
        } else if (req.session.admin) {
            next();
        } else {
            res.status(302).redirect('/');
        }
    });
});

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

//Admin Client Search
router.post('/client/search', multer().none(), controller.backoffice_admin_client_search_post);


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

// Admin Book search
router.post('/book/search', multer().none(), controller.backoffice_admin_book_search_post);



// ------------------------------ Admin/Sale URL

// Admin Sale Index
router.get('/sales', controller.backoffice_admin_sales_get);

// Admin Sale Create
router.get('/sales/makeSale', controller.backoffice_admin_make_sale_get);
router.post('/sales/makeSale', multer().none(), controller.backoffice_admin_make_sale_post);

// Admin Sale Search
router.post('/sales/search', multer().none(), controller.backoffice_admin_sale_search);



// ------------------------------ Admin/Points URL

router.get('/managePoints', controller.backoffice_admin_managepoints_get);

router.post('/managePoints', multer().none(), controller.backoffice_admin_managepoints_post);

router.get('/manageDiscount', controller.backoffice_admin_managediscount_get);

router.post('/manageDiscount', multer().none(), controller.backoffice_admin_managediscount_post);


module.exports = router;

