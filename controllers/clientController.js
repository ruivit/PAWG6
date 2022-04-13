//var Client = require('../models/clientModel');

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
exports.client_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: client create POST');
};

// TODO - Authentication and stuff

