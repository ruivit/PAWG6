const { redirect } = require('express/lib/response');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var jwt = require('jsonwebtoken');

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
                if (employee.checkPassword(req.body.password)) {
                    if (employee.admin) {
                        req.session.admin = true;
                        req.session.username = employee.username;
                        req.session.employeeID = employee._id;
                        var token = jwt.sign({ employeeID: employee._id }, process.env.SECRET_KEY, 
                            { expiresIn: '1h' }, (err, token));
                        res.cookie('token', token);
                        res.render('backoffice/backofficeIndex', { admin: true });
                    } else {
                        req.session.admin = false;
                        req.session.employee = true;
                        req.session.username = employee.username;
                        req.session.employeeID = employee._id;  
                        var token = jwt.sign({ employeeID: employee._id }, process.env.SECRET_KEY, 
                            { expiresIn: '1h' }, (err, token));
                        res.cookie('token', token);
                        res.render('backoffice/backofficeIndex', { admin: false });
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

    // clear the cookies and token
    res.clearCookie('token');

    res.redirect('/backoffice');
}; 