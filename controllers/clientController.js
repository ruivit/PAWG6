const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");

var Client = require('../models/clientModel');

// Get the home page (no client logged in)
exports.client_index = function(req, res) {
    res.render('indexs/index');
};

// Get the login page for the client
exports.client_login = function(req, res) {
    res.render('client/clientLogin');
};

// Form to create a client
exports.client_create_get = function(req, res) {
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
            res.redirect('/');
        }
    }
];

// TODO - Authentication and stuff

