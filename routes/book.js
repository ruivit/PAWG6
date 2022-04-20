var express = require('express');
var multer = require('multer');
var router = express.Router();


var bookController = require('../controllers/bookController');

// New Books page
router.get('/new', bookController.new_books);

// Form to create a new book
router.get('/create', bookController.books_create_get);

// POST request to create a new book
router.post('/create', multer().none(), bookController.books_create_post);

// Listing of all books
router.get('/books', bookController.books);

// Delete a book POST request
router.post('/delete/:id', multer().none(), bookController.book_delete_post);

// Form to update a book
router.get('/update/:id', bookController.book_update_get);

//router.post('/books/update/:id', multer().none(), bookController.book_update_post);

module.exports = router;

