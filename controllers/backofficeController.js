const { redirect } = require('express/lib/response');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');


// -------------------- Backoffice/ ---------------------------

// Login Portal
exports.backoffice_login_get = function (req, res) {
    res.render('backoffice/backofficeLogin');
};

// Login Process
exports.backoffice_login_post = function (req, res) {
    // Search the username and password (hash) in the database
    // if the admin field is true go to admin dashboard
    // if the admin field is false go to employee dashboard
    Employee.findOne({ username: req.body.username }, function (err, employee) {
        if (err) {
            res.redirect('error', { error: err });
        } else {
            if (employee) {
                if (employee.validPassword(req.body.password)) {
                    if (employee.admin) {
                        req.session.admin = true;
                        req.session.username = employee.username;
                        req.session.employeeID = employee._id;
                        res.redirect('/backoffice/admin');
                    } else {
                        req.session.admin = false;
                        req.session.employee = true;
                        req.session.username = employee.username;
                        req.session.employeeID = employee._id;  
                        res.redirect('/backoffice/employee');
                    }

                // If the username/password is wrong, render the login page again with a message
                } else {
                    res.render('backoffice/backofficeLogin', { message: 'Invalid password' });
                }
            } else {
                res.render('backoffice/backofficeLogin', { message: 'Invalid username' });
            }
        }
    });
};

// Logout Process
exports.backoffice_logout = function (req, res) {
    req.session.destroy();
    res.redirect('/backoffice');
}; 