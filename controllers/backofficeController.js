const { redirect } = require('express/lib/response');
const { session } = require('passport/lib');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');


// -------------------- Backoffice/ ---------------------------

// Login Portal
exports.backoffice_login_get = function (req, res) {
    res.render('backoffice/backofficeLogin');
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
                        req.session.employeeID = employee._id;
                        res.redirect('/backoffice/admin');
                    } else {
                        req.session.admin = false;
                        req.session.username = employee.username;
                        req.session.employeeID = employee._id;
                        res.redirect('/backoffice/employee');
                    }
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