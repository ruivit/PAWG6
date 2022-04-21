const { redirect } = require('express/lib/response');

// ----------------------- Models ------------------------------
var Book = require('../models/bookModel');
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');


// -------------------- GET Requests ---------------------------

// Form to create a book
exports.books_create_get = function (req, res) {
    res.render('books/createBook');
};

// List the books
exports.books = async function (req, res) {  
    try {
        var books = await Book.find().sort({ _id: -1 });
        res.render('books/books', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
};

// List the newest books
exports.new_books = async function (req, res) {
    try {
        var books = await Book.find().sort({ added: -1 }).limit(6);
        res.render("index/newBooks", { books: books });
    } catch (error) {
        res.render("error/error", { message: "Error finding books", error: error });
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


// -------------------- POST Requests ---------------------------

// Create the book
exports.books_create_post = (req, res) => {

    /* Validations - text based were already made in HTML
    - Check if isbn already exist */
    
    // Using promises to validate the data
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        if (promisesToDo[0] != null) {
            res.render('books/createBook', { oldata: req.body, message: "Duplicated ISBN" });
        }
    }).then(function () {
        // Create the book
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publisher: req.body.publisher,
            year: req.body.year,
            price: req.body.price,
            stock: req.body.stock,
            isbn: req.body.isbn
        });

        book.save(function (err) {
            if (err) {
                res.render('error', { message: "Error creating book", error: err });
            } else {
                res.render('admin/adminPortal', { message: "Book created successfully" });
            }
        });
    });
};
    

// Delete the book 
exports.book_delete_post = async function (req, res) {
    try {
        await Book.findByIdAndRemove(req.params.id);
        res.redirect('/book/books');
    } catch (error) {
        res.render("error", { message: "Error deleting book", error: error });
    }
};


// Update the book
exports.book_update_post = async function (req, res) {
    Book.findOneAndUpdate({ isbn: req.body.isbn }, req.body, { new: true }, function (err, book) {
        if (err) { return next(err); }
        res.redirect('/book/books');
    });
};
// --------------------------------------------------------------
