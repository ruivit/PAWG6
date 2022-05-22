// ----------------------- Models ------------------------------
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var Sale = require('../models/saleModel');

var jwt = require('jsonwebtoken');
var crypto = require('crypto');

// -------------------- Client/ ---------------------------
//#region login/index
exports.client_login_get = function (req, res) {
    res.render('client/loginClient');
}; // Login Portal

exports.client_login_post = function (req, res) {
    // search the username in the database
    Client.findOne({ username: req.body.username }, function (err, client) {
        if (err) {
            res.redirect('error/error', { error: err });
        } else {
            if (client) {
                // check if the password is correct
                if (client.checkPassword(req.body.password, client.password)) {
                    // save the client in the session
                    req.session.client = client;
                    req.session.client._id = client._id;
                    
                    token = jwt.sign({ clientID: client._id }, 
                        process.env.SECRET_KEY, 
                        { expiresIn: '6h' });

                    res.cookie('token', token, {
                        maxAge: 3600000,
                        httpOnly: true,
                        samesite: 'Strict',
                        secure: true,
                    });

                    res.redirect('/client');
                    
                } else {
                    res.render('client/loginClient', { message: 'Wrong password' });
                }
            } else {
                res.render('client/loginClient', { message: 'Wrong username' });
            }
        }
    });
};

exports.client_logout = function (req, res) {
    req.session.destroy();
    
    res.clearCookie('token');

    res.redirect('/');
}; // Logout Process
//#endregion

// -------------------- Client/Create ---------------------------
//#region createClient

exports.client_create_get = function (req, res) {
    res.render('client/createClient');
}; // Create client form

exports.client_create_post = function (req, res) {
    function calculatePoints(points) {
        var totalPoints = 0;
        if (points == "" || points == null) {
            return 10;
        } else {
            return totalPoints;
        }// else, logica de negocio
    }

    var usernamePromise = Client.findOne({ username: req.body.username });
    var emailPromise = Client.findOne({ email: req.body.email });
    
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            res.render('client/createClient', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('client/createClient', 
            { oldata: req.body, message: "Email already exists" });
        } else {
        // If the username and email are not already in use, create the client
        var client = new Client({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            points: calculatePoints(req.body.points),
            birthDate: req.body.birthDate,
            dateString: req.body.birthDate,
        });

        client.setPassword(req.body.password);        
        client.setAgeType(req.body.birthDate);

        client.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating client", error: err });
            } else {
                res.redirect('/client');
            }
        });
    }
    });
}; // Create a client
//#endregion



// -------------------- Client/Sell Book ---------------------------
//#region sellBookClient

exports.client_sell_get = function (req, res) {
    res.render('client/sellBookClient');
}; // // Get the form to sell a book

exports.client_sell_post = function (req, res) {
    /* Ver se ISBN existe
    Se sim, criar livro USADO
    Se nao, criar livro USADO E NOVO com stock a 0 
    Alterar estado forSale para false, ou seja validação do novo livro pelo admin
    
    No admin, fazer filtragem de books com forSale false
    Se aceitar, mudar para true e mudar preco etc */
};
//#endregion

// -------------------- Client/Profile ---------------------------
//#region profileClient
exports.client_profile_get = function (req, res) {
    var client = Client.findById(req.session.client._id, function (err, client) {
        if (err) {
            res.redirect('error', { error: err });
        } else {
            res.render('client/profileClient', { client: client });
        }
    });
}; // Get the Client Profile

exports.client_profile_post = function (req, res) {
    try{
        Client.findByIdAndUpdate(req.session.client._id, {
            username: req.body.username,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            points: req.body.points,
            birthDate: req.body.birthDate,
        }, function (err, client) {
            if (err) {
                res.redirect('error/error', { error: err });
            } else {
                res.redirect('/client');
            }
        });
    } catch (err) {
        res.redirect('error/error', { error: err });
    }
}; // Update the client information


exports.client_updatepassword_get = function (req, res) {
    var client = Client.findById(req.session.client._id, function (err, client) {
        if (err) {
            res.redirect('error/error', { error: err });
        } else {
            res.render('client/updatePassword', { client: client });
        }
    });
}; // Get the form to update the client password

exports.client_updatepassword_post = function (req, res) {
    try {
        var salt = crypto.randomBytes(16).toString('hex'); 
        var newPasswordHash = crypto.pbkdf2Sync(req.body.password, salt,  
        1000, 64, process.env.ENCRYPTION).toString('hex');

        Client.findOneAndUpdate({ username: req.body.username }, 
            { salt: salt, passwordHash: newPasswordHash }, { new: true },
            function (err, employee) {
            if (err) {
                res.render('error/error', { message: "Error updating client password", error: err });
            } else {
                // Milestone2 - add message of success
                res.redirect('/client');
            }
        });
    } catch (err) {
        res.render('error/error', { message: "Error updating client password", error: err });
    }
}; // Update the client password
//#endregion






// -------------------- Client/API ---------------------------

exports.client_index_get = function (req, res) {
    Book.find({ forSale: true }, function (err, books) {
        if (err) {
            res.render('error/error', { error: err });
        } else {
            res.status(200).json(books);
        }
    }).sort({ dateAdded: -1 }).limit(5);
}; // Get all the books for sale
