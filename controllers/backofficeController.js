const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");
const { session } = require('passport/lib');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var Sale = require('../models/saleModel');


// -------------------- Backoffice/ ---------------------------

// Login Portal
exports.backoffice_login_get = function (req, res) {
    res.render('backoffice/admin/backofficeLogin');
};

// Login Process
exports.backoffice_login_post = function (req, res) {
    data = req.body;
    var username = data.username;
    var password = data.password;

    // search the username in the database
    // if the admin field is true go to admin dashboard
    // if the admin field is false go to employee dashboard
    Employee.findOne({ username: username }, function (err, employee) {
        if (err) {
            res.redirect('error', { error: err });
        } else {
            if (employee) {
                if (employee.password == password) {
                    if (employee.admin) {
                        req.session.admin = true;
                        req.session.username = employee.username;
                        res.redirect('/backoffice/admin');
                    } else {
                        req.session.admin = false;
                        req.session.username = employee.username;
                        res.redirect('/backoffice/employee');
                    }
                } else {
                    res.redirect('/backoffice'); // dizer que password errada
                }
            } else {
                res.redirect('/backoffice'); // dizer que username nao existe
            }
        }
    });
};

// Logout Process
exports.backoffice_logout = function (req, res) {
    session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
};
