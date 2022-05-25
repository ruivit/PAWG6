var express = require('express');
var multer = require('multer');
var router = express.Router();


var clientAPIController = require('../controllers/clientAPIController');


// ------------------------------ Angular/ ---------------------------

router.get('/index', clientAPIController.client_index_get);

router.get('/clientPoints', clientAPIController.client_points_get);
router.get('/pointsData', clientAPIController.points_data_get);

router.post('/makeSale', multer().none(), clientAPIController.client_make_sale_post);

router.get('/search', multer().none(), clientAPIController.client_search_get);

router.post('/sellBook', multer().single('image'), clientAPIController.client_sell_usedbook_post);

router.get('/mypurschases', clientAPIController.client_mypurschases_get);
router.get('/mysoldbooks', clientAPIController.client_mysoldbooks_get);

module.exports = router;
