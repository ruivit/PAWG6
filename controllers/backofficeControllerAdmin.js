const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");
const { session } = require('passport/lib');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var Sale = require('../models/saleModel');


// --------------------- Backoffice/Admin/ ---------------------------

exports.backoffice_admin_get = function (req, res) {
    res.render('backoffice/admin/adminIndex');
};


// --------------------- Backoffice/Admin/Employee ---------------------------

exports.backoffice_admin_employee_get = async function (req, res) {
    try {
        var employees = await Employee.find().populate('username');
        res.render('backoffice/admin/employee/listEmployees', { employees: employees });
    }
    catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
};

exports.backoffice_admin_employee_create_get = function (req, res) {
    res.render('backoffice/admin/employee/createEmployee');
};

exports.backoffice_admin_employee_create_post = (req, res) => {
    // Using promises to validate the data
    var usernamePromise = Employee.findOne({ username: req.body.username });
    var emailPromise = Employee.findOne({ email: req.body.email });
    
    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            res.render('backoffice/admin/employee/createEmployee', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('backoffice/admin/employee/createEmployee', 
            { oldata: req.body, message: "Email already exists" });
        }
    }).then(function () {
        // If the username and email are not already in use, create the employee
        var employee = new Employee({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            category: req.body.category
        });
        employee.save(function (err) {
            if (err) {
                res.render('backoffice/admin/employee/createEmployee',
                { oldata: req.body, message: err });
            } else {
                res.redirect('/backoffice/admin/employee');
            }
        });
    });
};

exports.backoffice_admin_employee_update_get = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_employee_update_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_employee_delete_post = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            res.render('backoffice/admin/adminIndex', { message: "Employee removed successfully" });
        }
    });
};


// --------------------- Backoffice/Admin/Client ---------------------------

exports.backoffice_admin_client_get = async function (req, res) {
    try {
        var clients = await Client.find().populate('username');
        res.render('backoffice/admin/client/listClients', { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
};

exports.backoffice_admin_client_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_client_create_get = function (req, res) {
    res.render('backoffice/admin/client/createClient');
};

exports.backoffice_admin_client_create_post = function (req, res) {
    res.render('NotImplemented');
};


exports.backoffice_admin_client_update_get = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_client_update_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_client_delete_post = (req, res) => {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting client", error: err });
        } else {
            res.render('backoffice/admin/adminIndex', { message: "Client removed successfully" });
        }
    });
};


// --------------------- Backoffice/Admin/Book ---------------------------

exports.backoffice_admin_book_get = async function (req, res) {
    try {
        var books = await Book.find().populate('title');
        res.render('backoffice/admin/books/listBooks', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
};

exports.backoffice_admin_book_create_get = function (req, res) {
    res.render('backoffice/admin/books/createBook');
};

exports.backoffice_admin_book_create_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_book_update_get = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_book_update_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_book_delete_post = (req, res) => {
    Book.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting book", error: err });
        } else {
            res.render('backoffice/admin/adminIndex', { message: "Book removed successfully" });
        }
    });
};


// --------------------- Backoffice/Admin/Sale ---------------------------

exports.backoffice_admin_sale_get = function (req, res) {
    res.render('backoffice/admin/sale/listSale');
};

exports.backoffice_admin_sale_get = function (req, res) {
    res.render('backoffice/admin/sale/makeSale');
};

exports.backoffice_admin_sale_post = function (req, res) {
    res.render('NotImplemented');
};

