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
        var employees = await Employee.find().populate('username');
        res.render("employees/employees", { employees: employees });
    } catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
};

// List all clients
exports.clients = async function (req, res) {
    try {
        var clients = await Client.find().populate('username');
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
exports.employees_create_post = (req, res) => {

    /* Validations - text based were already made in HTML
    - Check if username and/or email already exist */
    
    // Using promises to validate the data
    var usernamePromise = Employee.findOne({ username: req.body.username });
    var emailPromise = Employee.findOne({ email: req.body.email });

    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            res.render('employees/createEmployee', { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('employees/createEmployee', { oldata: req.body, message: "Email already exists" });
        }
    }).then(function () {
        // Create the employee
        var employee = new Employee(
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
        });
        employee.save(function (err) {
            if (err) {
                res.render('error', { message: "Error creating employee", error: err });
            } else {
                res.render('admin/adminPortal', { message: "Employee created successfully" });
            }
        });
    });
};

// Delete an employee
exports.employees_delete_post = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            res.render('admin/adminPortal', { message: "Employee deleted successfully" });
        }
    });
};


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
            }
        };

    // check if the username and password match (admin)
    // TODO - check in the database, and if its admin or employee
    if (session.username == "admin" && session.password == "admin") {
        res.redirect('/admin');
    } else {
        session.destroy();
        res.redirect('/admin/login');
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
