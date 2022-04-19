const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");

// Models
var Book = require('../models/bookModel');

var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');

// Form to create a book
exports.books_create_get = function (req, res) {
    res.render('books/createBook');
};

// Create the book
exports.books_create_post = [
    // Validations
    body('title').isLength({ min: 1 }).trim().withMessage('Title cannot be blank'),
    body('author').isLength({ min: 1 }).trim().withMessage('Author cannot be blank'),
    body('genre').isLength({ min: 1 }).trim().withMessage('Genre cannot be blank'),
    body('publisher').isLength({ min: 1 }).trim().withMessage('Publisher cannot be blank'),
    body('year').isLength({ min: 3 }).trim().withMessage('Year cannot be blank'),
    body('price').isLength({ min: 1 }).trim().withMessage('Price cannot be blank'),
    body('stock').isLength({ min: 1 }).trim().withMessage('Quantity cannot be blank'),
    body('isbn').isLength({ min: 1 }).trim().withMessage('ISBN cannot be blank'),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Cuidado, basta um campo ir mal que ele gera erro e diz ERROR Headers cant be sent
        // e continua a aparecer o console.log com dados, mas não aparece na DB
        var book = new Book (
            {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                publisher: req.body.publisher,
                year: req.body.year,
                price: req.body.price,
                stock: req.body.stock,
                isbn: req.body.isbn,
                added: req.body.added,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. 
            // TODO - Add alert or something
            res.redirect('/');
            return;
        }
        else {
            // Data from form is valid.
            Book.findOne({ 'isbn': req.body.isbn }).
            exec(function (err, found_employee) {
                if (err) { return next(err); }
            });
            
            book.save(function (err) {
                if (err) { return next(err); }
            });
            console.log(book);
            res.redirect('/');
        }
    }
];


// List the books
exports.books = async function (req, res) {  
    try {
        var books = await Book.find().sort({ _id: -1 });
        res.render('books/books', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
};

exports.new_books = async function (req, res) {
    try {
        var books = await Book.find().sort({ added: -1 }).limit(6);
        res.render("index/newBooks", { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
};

exports.book_delete_post = async function (req, res) {
    try {
        await Book.findByIdAndRemove(req.params.id);
        res.redirect('book/books');
    } catch (error) {
        res.render("error", { message: "Error deleting book", error: error });
    }
};

exports.book_update_get = async function (req, res) {
    try {
        var book = await Book.findById(req.params.id);
        res.render('books/updateBook', { book: book });
    } catch (error) {
        res.render("error", { message: "Error finding book", error: error });
    }
};