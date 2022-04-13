const { redirect } = require('express/lib/response');

// Models - o admin acho que ja nao e precisso mas pronto
var Admin = require('../models/adminModel');
var Employee = require('../models/employeeModel');

exports.admin_index = function (req, res) {
    // Check if admin or employee is logged in - TODO
    // IF yes - render admin or employee page
    // ELSE - render login page (admin_login_get)
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
    // check if the username and password match (admin)
    // TODO - check in the database, and if its admin or employee
    if (username === 'admin' && password === 'admin') {
        res.redirect('/admin');
    } else {
        res.redirect('/admin');
    }
};

// Render and list the employees
exports.employees = function (req, res) {
    res.render('admin/employees');
};

// Form to create a employee
exports.employees_create_get = function (req, res) {
    res.render('admin/createEmployee');
};

// Create a new employee
exports.employees_create_post = function (req, res) {
    data = req.body;
    employee = new Employee(
    {
        username: data.username,
        password: data.password,
        email: data.email,
        name: data.name
    });
    employee.save(function (err) {
        if (err) { console.log(err); }
        else { console.log('Employee created: ' + employee.username); }
    });
    res.redirect('../');
};

exports.employees_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Employee delete GET');
};

exports.employees_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Employee update GET');
};

exports.employees_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Employee update GET');
};


