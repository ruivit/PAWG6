var express = require('express');
var multer = require('multer');
var router = express.Router();


var clientAPIController = require('../controllers/clientAPIController');


// ------------------------------ Angular/ ---------------------------

router.post('/register', clientAPIController.client_register_post);

router.post('/login', clientAPIController.client_login_post);

router.get('/books', clientAPIController.client_new_books_get);

router.get('/clientPoints', multer().none(), clientAPIController.client_points_get);
router.get('/pointsTable', clientAPIController.points_table_get);
router.get('/discountTable', clientAPIController.discount_table_get);

router.post('/makeSale', multer().none(), clientAPIController.client_make_sale_post);

// route /search?term=term&bookType=bookType
router.get('/search/:term/:bookType', clientAPIController.client_search_get);

router.post('/sellBook', multer().single('image'), clientAPIController.client_sell_tempbook_post);

router.get('/mypurschases', multer().none(), clientAPIController.client_mypurschases_get);
router.get('/mysoldbooks', multer().none(), clientAPIController.client_mysoldbooks_get);

module.exports = router;
