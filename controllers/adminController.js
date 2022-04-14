const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");

// Models - o admin acho que ja nao e precisso mas pronto
var Admin = require('../models/adminModel');
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');

exports.admin_index = function (req, res) {
    session = req.session;
    // If the user is not logged in, redirect to the login page
    if (!session.username) {
        res.render('admin/adminLogin');
    }
    res.render('admin/adminPortal');
};

// Render the login page for admin/employees
exports.admin_login_get = function (req, res) {
    res.render('admin/adminLogin');
};

// Authentication
exports.admin_login_post = function (req, res) {
    data = req.body;
    var username = data.username;
    var password = data.password;

    session = req.session;
    session.username = username;
    session.password = password;

    body('username').isLength({ min: 1 }).trim().withMessage('Username cannot be blank'),
    body('password').isLength({ min: 1 }).trim().withMessage('Password cannot be blank'),

    (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }};

    // check if the username and password match (admin)
    // TODO - check in the database, and if its admin or employee
    if (username === 'admin' && password === 'admin') {
        res.redirect('/admin');
    } else {
        res.redirect('/admin');
    }
};

exports.logout = function (req, res) {
    session = req.session;
    session.destroy(function (err) {
        if (err) { console.log(err); }
        res.writeHead(302, { 'Location': '/' });
        res.end();
    });
};

// List the employees
exports.employees = async function (req, res) {  
    try {
        var employees = await Employee.find().populate('username'); //popular o campo type com informação
        res.render("admin/employees", { employees: employees });
    } catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
};

// List all clients
exports.clients = async function (req, res) {  
    try {
        var clients = await Client.find().populate('username'); //popular o campo type com informação
        res.render("admin/clients", { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
};


// Form to create a employee
exports.employees_create_get = function (req, res) {
    res.render('admin/createEmployee');
};

// Create a new employee
exports.employees_create_post = [
    
    // Validations
    body('username', 'Username must not be blank').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password must not be blank').trim().isLength({ min: 1 }).escape(),
    body('email', 'Must be a valid email address').isEmail().escape(),
    body('name', 'Name must not be blank').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data (and the old id!)
        var employee = new Employee (
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                name: req.body.name
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
            // Check if employee with same username already exists.
            Employee.findOne({ 'username': req.body.username }).
            exec(function (err, found_employee) {
                if (err) { return next(err); }
            });
            
            employee.save(function (err) {
                if (err) { return next(err); }
            });
            console.log(employee);
            res.redirect('/');
        }
    }
];

exports.employees_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Employee delete GET');
};

exports.employees_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Employee update GET');
};

exports.employees_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Employee update GET');
};