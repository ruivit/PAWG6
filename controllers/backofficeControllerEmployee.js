const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");
const { session } = require('passport/lib');

// ----------------------- Models ------------------------------
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var Sale = require('../models/saleModel');


// --------------------- Backoffice/Employee/ ---------------------------

exports.backoffice_employee_get = function (req, res) {
    res.render('backoffice/backofficeIndex', { admin: false });
};


// --------------------- Backoffice/Employee/Client ---------------------------

exports.backoffice_employee_client_get = async function (req, res) {
    try {
        var clients = await Client.find().populate('username');
        res.render('backoffice/admin/client/listClients', { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
};

exports.backoffice_employee_client_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_employee_client_create_get = (req, res) => {
    // Using promises to validate the data
    var usernamePromise = CLient.findOne({ username: req.body.username });
    var emailPromise = Client.findOne({ email: req.body.email });
    
    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            res.render('backoffice/employee/createEmployee', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('backoffice/employee/createEmployee', 
            { oldata: req.body, message: "Email already exists" });
        }
    }).then(function () {
        // If the username and email are not already in use, create the client
        var client = new Client({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            points: req.body.points,
            birthDate: req.body.birthDate,
            ageType: req.body.birthDate - new Date().getFullYear(),
        });
        client.save(function (err) {
            if (err) {
                console.log(err);
                res.render('error', { message: "Error creating client", error: err });
            } else {
                res.redirect('/backoffice/employee/client');
            }
        });
    });
};


exports.backoffice_employee_client_create_post = function (req, res) {
    res.render('NotImplemented');
};


exports.backoffice_employee_client_update_get = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_employee_client_update_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_employee_client_delete_post = (req, res) => {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting client", error: err });
        } else {
            res.render('backoffice/admin/adminIndex', { message: "Client removed successfully" });
        }
    });
};


// --------------------- Backoffice/Admin/Book ---------------------------

exports.backoffice_employee_book_get = async function (req, res) {
    try {
        var books = await Book.find().populate('title');
        res.render('backoffice/admin/books/listBooks', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
};

exports.backoffice_employee_book_create_get = (req, res) => {
    // Using promises to validate the data
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    // If the isbn already exists, add the stock+1
    if (isbnPromise) {
        Book.findOne({ isbn: req.body.isbn }, function (err, book) {
            if (err) {
                res.render('error', { message: "Error finding book", error: err });
            } else {
                book.stock = book.stock + 1;
                book.save(function (err) {
                    if (err) {
                        res.render('error', { message: "Error saving book", error: err });
                    } else {
                        res.redirect('/backoffice/employee/book');
                    }
                });
            }
        });
    } else {
        // If the isbn does not exist, create the book
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre,
            stock: req.body.stock,
            dataAdd: req.body.dataAdd,
            condition: req.body.condition,
            resume: req.body.resume,
            avaliation: req.body.avaliation,
            price: req.body.price,
        });
        book.save(function (err) {
            if (err) {
                res.render('error', { message: "Error creating book", error: err });
            } else {
                res.redirect('/backoffice/employee/book');
            }
        });
    }
};


exports.backoffice_employee_book_create_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_employee_book_update_get = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_employee_book_update_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_employee_book_delete_post = (req, res) => {
    Book.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting book", error: err });
        } else {
            res.render('backoffice/admin/adminIndex', { message: "Book removed successfully" });
        }
    });
};


// --------------------- Backoffice/Admin/Sale ---------------------------

exports.backoffice_employee_sale_get = function (req, res) {
    res.render('backoffice/admin/sale/listSale');
};

exports.backoffice_employee_sale_get = function (req, res) {
    res.render('backoffice/admin/sale/makeSale');
};

exports.backoffice_employee_sale_post = function (req, res) {
    res.render('NotImplemented');
};

