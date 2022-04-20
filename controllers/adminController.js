const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");

// ----------------------- Models ------------------------------
var Admin = require('../models/adminModel');
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');


// -------------------- GET Requests ---------------------------

// Get the admin page, or redirect to login
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

// List the employees
exports.employees = async function (req, res) {  
    try {
        var employees = await Employee.find().populate('username'); //popular o campo type com informação
        res.render("employees/employees", { employees: employees });
    } catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
};

// List all clients
exports.clients = async function (req, res) {  
    try {
        var clients = await Client.find().populate('username'); //popular o campo type com informação
        res.render("client/clients", { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
};

// Form to create a employee
exports.employees_create_get = function (req, res) {
    res.render('employees/createEmployee');
};


// -------------------- POST Requests ---------------------------

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

exports.logout = function (req, res) {
    session = req.session;
    session.destroy(function (err) {
        if (err) { console.log(err); }
        res.writeHead(302, { 'Location': '/' });
        res.end();
    });
};
