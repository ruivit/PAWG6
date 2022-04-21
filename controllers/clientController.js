const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");

// ----------------------- Models ------------------------------
var Client = require('../models/clientModel');


// -------------------- GET Requests ---------------------------

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

// Form to create a client
exports.client_create_get = function (req, res) {
    res.render('client/createClient');
};

exports.client_update_get = async function (req, res) {
    try {
        var clientOld = await Client.findById(req.params.id);
        res.render('client/updateClient', { oldata: clientOld });
    } catch (error) {
        res.render("error", { message: "Error finding client", error: error });
    }
};

// -------------------- POST Requests ---------------------------

// Create the client
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

// Create a new client
exports.client_create_post = (req, res) => {
    
    /* Validations - text based were already made in HTML
    - Check if username and/or email already exist */
    
    // Using promises to validate the data
    var usernamePromise = Client.findOne({ username: req.body.username });
    var emailPromise = Client.findOne({ email: req.body.email });

    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            res.render('client/createClient', { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('client/createClient', { oldata: req.body, message: "Email already exists" });
        }
    }).then(function () {
        // Create the employee
        var client = new Client(
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
        });

        client.save(function (err) {
            if (err) {
                res.render('error', { message: "Error creating client", error: err });
            } else {
                res.render('index/index');
            }
        });
    });
};


exports.client_delete_post = function (req, res) {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) { return next(err); }
        
        res.redirect('/admin/clients');
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
