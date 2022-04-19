const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");

var Client = require('../models/clientModel');

// Get the home page (no client logged in)
exports.client_index = function (req, res) {
    // Auth process, check if user exists blablabla
    res.render('index/index-user');
};

// Get the login page for the client
exports.client_login = function (req, res) {
    session = req.session;

    // If the user is logged in, redirect to the client portal
    if (session.username) {
        res.redirect('/client');
    } else {
        res.render('client/clientLogin');
    }
};

exports.client_login_post = function (req, res) {
    session = req.session;

    session.username = req.body.username;
    session.password = req.body.password;

    console.log(session.username);
    // Find the client in the database
    Client.findOne({ username: session.username, password: session.password }, function (err, client) {
        if (err) { console.log(err); }
        if (client) {
            // If the client is found, redirect to the client's page
            res.redirect('/client');
        } else {
            // If the client is not found, redirect to the login page
            res.redirect('/client/login');
        }
    });
};

exports.client_logout = function (req, res) {
    session = req.session;
    session.destroy(function (err) {
        if (err) { console.log(err); }
        res.writeHead(302, { 'Location': '/' });
        res.end();
    });
};

// Form to create a client
exports.client_create_get = function (req, res) {
    res.render('client/createClient');
};

// Create a new client
exports.client_create_post = [

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
        var client = new Client(
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
            console.log("E" + errors);
            res.redirect('/');
            return;
        }
        else {
            /* Data from form is valid.
            // Check if employee with same username already exists.
            Client.findOne({ 'username': req.body.username }).
            exec(function (err, found_employee) {
                if (err) { return next(err); }
            });*/

            client.save(function (err) {
                if (err) { return next(err); }
            });
            console.log("Client: " + client);
            if (req.session.username === 'admin') {
                res.redirect('/admin/clients');
            } else {
                res.redirect('/client');
            }
        }
    }
];

exports.client_delete_post = function (req, res) {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) { return next(err); }
        
        res.redirect('/admin/clients');
    });
};


// TODO - Authentication and stuff

