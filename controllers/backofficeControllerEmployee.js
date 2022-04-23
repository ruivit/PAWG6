const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");
const { session } = require('passport/lib');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var Sale = require('../models/saleModel');


// --------------------- Backoffice/employee/ ---------------------------

exports.backoffice_employee_get = function (req, res) {
    res.render('backoffice/backofficeIndex', { employee: true });
}; // Done


// --------------------- Backoffice/employee/Client ---------------------------

exports.backoffice_employee_client_get = async function (req, res) {
    try {
        var clients = await Client.find().populate('username');
        res.render('backoffice/employee/client/manageClients', { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
}; // Done

exports.backoffice_employee_client_create_get = function (req, res) {
    res.render('backoffice/employee/client/createClient');
}; // Done

exports.backoffice_employee_client_create_post = (req, res) => {
    function calculatePoints(points) {
        var totalPoints = 0;
        if (points == "" || points == null) {
            return 10;
        } else {
            return totalPoints;
        }// else, logica de negocio
    }

    // Using promises to validate the data
    var usernamePromise = Client.findOne({ username: req.body.username });
    var emailPromise = Client.findOne({ email: req.body.email });
    
    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            res.render('backoffice/employee/client/createClient', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('backoffice/employee/client/createClient', 
            { oldata: req.body, message: "Email already exists" });
        } else {
        // If the username and email are not already in use, create the client
        var client = new Client({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            points: calculatePoints(req.body.points),
            birthDate: req.body.birthDate,
            ageType: 21, // falta calcular
        });

        client.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating client", error: err });
            } else {
                res.redirect('/backoffice/employee/client');
            }
        });
        }
    });
}; // Done


exports.backoffice_employee_client_update_get = async function (req, res) {
    try {
        var client = await Client.findById(req.params.id);
        res.render('backoffice/employee/client/updateClient', { client: client });
    } catch (error) {
        res.render("error/error", { message: "Error updating client", error: error });
    }
}; // Done

exports.backoffice_employee_client_update_post = async function (req, res) {
    Client.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating client", error: err });
        } else {
            res.redirect('/backoffice/employee/client');
        }
    });
}; // Done


exports.backoffice_employee_client_delete_post = (req, res) => {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            res.redirect('/backoffice/employee/client'); // Need to add success message
        }
    });
}; // Done


// --------------------- Backoffice/employee/Book ---------------------------

exports.backoffice_employee_book_get = async function (req, res) {
    try {
        var books = await Book.find();
        res.render('backoffice/employee/book/manageBooks', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
}; // Done

exports.backoffice_employee_book_create_get = function (req, res) {
    res.render('backoffice/employee/book/createBook');
}; // Done, CSS MARAVILHA

exports.backoffice_employee_book_create_post = (req, res) => {
    
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    // Wait for the promises to resolve
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        // If the isbn already exists, increate the stock of that book by 1
        if (promisesToDo[0]) {
            Book.findOneAndUpdate({ isbn: req.body.isbn }, { $inc: { stock: 1 } }, { new: true }, 
                function (err, book) {
                if (err) {
                    res.render('error/error', { message: "Error creating book", error: err });
                } else {
                    res.redirect('/backoffice/employee/book'); // Need to add error message
                }
            });
        } else {
        // If the isbn is not already in use, create the book
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            editor: req.body.editor,
            resume: req.body.resume,
            avaliation: req.body.avaliation,
            isbn: req.body.isbn,
            dateAdded: req.body.dateAdded,
            condition: req.body.condition,
            provider: req.body.provider,
            stock: req.body.stock,
            price: req.body.price,
        });

        book.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating book", error: err });
            } else {
                res.redirect('/backoffice/employee/book');
            }
        });
        }
    });
}; // Done


exports.backoffice_employee_book_update_get = async function (req, res) {
    try {
        var book = await Book.findById(req.params.id);
        res.render('backoffice/employee/book/updateBook', { book: book });
    } catch (error) {
        res.render("error/error", { message: "Error updating book", error: error });
    }
}; // Done

exports.backoffice_employee_book_update_post = async function (req, res) {
    await Book.findOneAndUpdate( {"_id.$oid": req.params.id}, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating book", error: err });
        } else {
            res.redirect('/backoffice/employee/book');
        }
    });
}; // Done


exports.backoffice_employee_book_delete_post = (req, res) => {
    Book.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting book", error: err });
        } else {
            res.redirect('/backoffice/employee/book'); // Need to add success message
        }
    });
}; // Done


// --------------------- Backoffice/employee/Sale ---------------------------
// Everything Todo

exports.backoffice_employee_sale_get = async function (req, res) {
    try {
        var sales = await Sale.find();
        res.render('backoffice/employee/sales/manageSales', { sales: sales });
    } catch (error) {
        res.render("error", { message: "Error finding sales", error: error });
    }
};

exports.backoffice_employee_make_sale_get = function (req, res) {
    res.render('backoffice/employee/sales/makeSale');
};

exports.backoffice_employee_make_sale_post = function (req, res) {
    
    res.render('NotImplemented');
};

