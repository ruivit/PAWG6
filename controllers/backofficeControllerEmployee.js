const { redirect } = require('express/lib/response');
const { session } = require('passport/lib');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var Sale = require('../models/saleModel');
var Author = require('../models/authorModel');
var Editor = require('../models/editorModel');
var Points = require('../models/pointsModel');


// --------------------- Backoffice/employee/ ---------------------------

exports.backoffice_employee_get = function (req, res) {
    res.render('backoffice/backofficeIndex', { employee: true });
}; // Done


// --------------------- Backoffice/employee/Client ---------------------------

exports.backoffice_employee_client_get = async function (req, res) {
    try {
        var clients = await Client.find().populate('username');
        res.render('backoffice/employee/client/manageClients', { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
}; // Done

exports.backoffice_employee_client_create_get = function (req, res) {
    res.render('backoffice/employee/client/createClient');
}; // Done

exports.backoffice_employee_client_create_post = function (req, res) {
    function calculatePoints(points) {
        var totalPoints = 0;
        if (points == "" || points == null) {
            return 10;
        } else {
            return totalPoints;
        }// else, logica de negocio
    }

    // Using promises to validate the data
    var usernamePromise = Client.findOne({ username: req.body.username });
    var emailPromise = Client.findOne({ email: req.body.email });
    
    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            res.render('backoffice/employee/client/createClient', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('backoffice/employee/client/createClient', 
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
            ageType: 21, // falta calcular
        });

        client.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating client", error: err });
            } else {
                res.redirect('/backoffice/employee/client');
            }
        });
        }
    });
}; // Done


exports.backoffice_employee_client_update_get = async function (req, res) {
    try {
        var client = await Client.findById(req.params.id);
        res.render('backoffice/employee/client/updateClient', { client: client });
    } catch (error) {
        res.render("error/error", { message: "Error updating client", error: error });
    }
}; // Done

exports.backoffice_employee_client_update_post = async function (req, res) {
    Client.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating client", error: err });
        } else {
            res.redirect('/backoffice/employee/client');
        }
    });
}; // Done


exports.backoffice_employee_client_delete_post = function (req, res) {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            res.redirect('/backoffice/employee/client'); // Need to add success message
        }
    });
}; // Done


// --------------------- Backoffice/employee/Book ---------------------------

exports.backoffice_employee_book_get = async function (req, res) {
    try {
        var books = await Book.find();
        res.render('backoffice/employee/book/manageBooks', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
}; // Done

exports.backoffice_employee_book_create_get = function (req, res) {
    res.render('backoffice/employee/book/createBook');
}; // Done

exports.backoffice_employee_book_create_post = function (req, res) {
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    // Wait for the promises to resolve
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        // If the isbn already exists
        if (promisesToDo[0]) {
            oldata = req.body;
            res.render('backoffice/employee/book/createBook', { oldata: oldata, message: "ISBN already exists" });
        } else {
        // If the isbn is not already in use, create the book
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            editor: req.body.editor,
            resume: req.body.resume,
            isbn: req.body.isbn,
            condition: req.body.condition,
            provider: req.body.provider,
            sellPrice: req.body.sellPrice,
            buyPrice: req.body.buyPrice,
        });

        book.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating book", error: err });
            } else {
                // find or create the author
                Author.findOne({ name: req.body.author }, function (err, author) {
                    if (err) {
                        res.render('error/error', { message: "Error creating book", error: err });
                    } else {
                        if (!author) {
                            var author = new Author({
                                name: req.body.author,
                                books: [book]
                            });

                            author.save(function (err) {
                                if (err) {
                                    res.render('error/error', { message: "Error creating author", error: err });
                                }
                            });
                        } else {
                            author.books.push(book);
                            author.save(function (err) {
                                if (err) {
                                    res.render('error/error', { message: "Error creating author", error: err });
                                }
                            });
                        }
                    }
                });

                // find or create the editor
                Editor.findOne({ name: req.body.editor }, function (err, editor) {
                    if (err) {
                        res.render('error/error', { message: "Error creating book", error: err });
                    } else {
                        if (!editor) {
                            var editor = new Editor({
                                name: req.body.editor,
                                books: [book]
                            });

                            editor.save(function (err) {
                                if (err) {
                                    res.render('error/error', { message: "Error creating editor", error: err });
                                }
                            });
                        } else {
                            editor.books.push(book);
                            editor.save(function (err) {
                                if (err) {
                                    res.render('error/error', { message: "Error creating editor", error: err });
                                } else {
                                    res.redirect('/backoffice/employee/book');
                                }
                            });
                        }
                    }
                });
            }
        });
        }
    });
}; // Done     


exports.backoffice_employee_book_update_get = async function (req, res) {
    try {
        var book = await Book.findById(req.params.id);
        res.render('backoffice/employee/book/updateBook', { book: book });
    } catch (error) {
        res.render("error/error", { message: "Error updating book", error: error });
    }
}; // Done

exports.backoffice_employee_book_update_post = function (req, res) {
    Book.findOneAndUpdate( {"_id.$oid": req.params.id}, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating book", error: err });
        } else {
            res.redirect('/backoffice/employee/book');
        }
    });
}; // Done

exports.backoffice_employee_book_search_post = async function (req, res) {
    try {
        console.log(req.body.search);
        // find everything that matches the text, by title or author
        var books = await Book.find({ $or: [
        { title: { $regex: req.body.search, $options: 'i' } }, 
        { author: { $regex: req.body.search, $options: 'i' } },
        { editor: { $regex: req.body.search, $options: 'i' } },
        { isbn: { $regex: req.body.search, $options: 'i' } },
        { providor: { $regex: req.body.search, $options: 'i' } }
        ] });
        res.render('backoffice/employee/book/manageBooks', { books: books });
    } catch (error) {
        res.render("error/error", { message: "Error searching books", error: error });
    }
}; // Done


exports.backoffice_employee_book_delete_post = function (req, res) {
    Book.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting book", error: err });
        } else {
            res.redirect('/backoffice/employee/book'); // Need to add success message
        }
    });
}; // Done


// --------------------- Backoffice/employee/Sale ---------------------------
// Everything Todo

exports.backoffice_employee_sale_get = async function (req, res) {
    try {
        var books = await Book.find();
        res.render('backoffice/employee/sales/manageSales', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding sales", error: error });
    }
};

exports.backoffice_employee_make_sale_get = function (req, res) {
    res.render('backoffice/employee/sales/makeSale');
};

exports.backoffice_employee_make_sale_post = async function (req, res) {
    // get the ID based on the username
    var books = await Book.find();
    Client.findOne({ username: req.body.clientUsername }, function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error finding user", error: err });
        } else {
            if (!client) {
                res.render('backoffice/employee/sales/manageSales', 
                { message: "User not found", books: books });
            } else {
                // make the sale
                var sale = new Sale({
                    clientUsername: req.body.clientUsername,
                    books: req.body.bookId,
                    total: 50,
                    //total: calculateTotal(),
                    online: req.body.online,
                    employee_id: req.session.employeeID,
                    //shipping: calculateShipping(),
                    shipping: 50,
                });

                sale.save(function (err) {
                    if (err) {
                        res.render('error/error', { message: "Error creating sale", error: err });
                    } else {
                        res.redirect('/backoffice/employee/sales');
                    }
                });
            }
        }
    });
};
        
