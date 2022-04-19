var express = require('express');
var router = express.Router();

// Necessario para "ver" o body que o form envia
// Se calhar ha outra opcao melhor..., mas esta funciona bem!
var multer = require('multer');

var bookController = require('../controllers/bookController');

router.get('/new', bookController.new_books);

router.get('/create', bookController.books_create_get);

router.post('/create', multer().none(), bookController.books_create_post);

router.get('/books', bookController.books);

router.post('/delete/:id', multer().none(), bookController.book_delete_post);

// Not currently updating!
router.get('/update/:id', bookController.book_update_get);

//router.post('/books/update/:id', multer().none(), bookController.book_update_post);

module.exports = router;

