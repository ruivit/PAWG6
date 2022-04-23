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


// --------------------- Backoffice/Admin/ ---------------------------

exports.backoffice_admin_get = function (req, res) {
    res.render('backoffice/backofficeIndex', { admin: true });
}; // Done


// --------------------- Backoffice/Admin/Employee ---------------------------

exports.backoffice_admin_employee_get = async function (req, res) {
    try {
        var employees = await Employee.find().populate('username');
        res.render('backoffice/admin/employee/manageEmployees', { employees: employees });
    }
    catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
}; // Done

exports.backoffice_admin_employee_create_get = function (req, res) {
    res.render('backoffice/admin/employee/createEmployee');
}; // Done

exports.backoffice_admin_employee_create_post = (req, res) => {
    // Using promises to validate the data
    var usernamePromise = Employee.findOne({ username: req.body.username });
    var emailPromise = Employee.findOne({ email: req.body.email });
    
    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            return res.render('backoffice/admin/employee/createEmployee', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            return res.render('backoffice/admin/employee/createEmployee', 
            { oldata: req.body, message: "Email already exists" });
        } else {
            // If the username and email are unique, create the employee
            var employee = new Employee({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                email: req.body.email,
                category: req.body.category,
                admin: false,
            });

            employee.save(function (err) {
                if (err) {
                    res.render('error/error', { message: "Error creating employee", error: err });
                } else {
                    res.redirect('/backoffice/admin/employee');
                }
            });
        }
    });
}; // Done


exports.backoffice_admin_employee_update_get = async function (req, res) {
    try {
        var employee = await Employee.findById(req.params.id);
        res.render('backoffice/admin/employee/updateEmployee', { employee: employee });
    } catch (error) {
        res.render("error/error", { message: "Error updating employee", error: error });
    }
}; // Done

exports.backoffice_admin_employee_update_post = async function (req, res) {
    Employee.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, employee) {
        if (err) {
            res.render('error/error', { message: "Error updating employee", error: err });
        } else {
            res.redirect('/backoffice/admin/employee');
        }
    });
}; // Done
    

exports.backoffice_admin_employee_delete_post = (req, res) => {   
    Employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            res.redirect('/backoffice/admin/employee'); // Need to add success message
        }
    });
}; // Done


// --------------------- Backoffice/Admin/Client ---------------------------

exports.backoffice_admin_client_get = async function (req, res) {
    try {
        var clients = await Client.find().populate('username');
        res.render('backoffice/admin/client/manageClients', { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
}; // Done

exports.backoffice_admin_client_create_get = function (req, res) {
    res.render('backoffice/admin/client/createClient');
}; // Done

exports.backoffice_admin_client_create_post = (req, res) => {
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
            res.render('backoffice/admin/client/createClient', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('backoffice/admin/client/createClient', 
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
                res.redirect('/backoffice/admin/client');
            }
        });
        }
    });
}; // Done


exports.backoffice_admin_client_update_get = async function (req, res) {
    try {
        var client = await Client.findById(req.params.id);
        res.render('backoffice/admin/client/updateClient', { client: client });
    } catch (error) {
        res.render("error/error", { message: "Error updating client", error: error });
    }
}; // Done

exports.backoffice_admin_client_update_post = async function (req, res) {
    Client.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating client", error: err });
        } else {
            res.redirect('/backoffice/admin/client');
        }
    });
}; // Done


exports.backoffice_admin_client_delete_post = (req, res) => {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            res.redirect('/backoffice/admin/client'); // Need to add success message
        }
    });
}; // Done


// --------------------- Backoffice/Admin/Book ---------------------------

exports.backoffice_admin_book_get = async function (req, res) {
    try {
        var books = await Book.find();
        res.render('backoffice/admin/book/manageBooks', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
}; // Done

exports.backoffice_admin_book_create_get = function (req, res) {
    res.render('backoffice/admin/book/createBook');
}; // Done

exports.backoffice_admin_book_create_post = (req, res) => {
    
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    // Wait for the promises to resolve
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        // If the isbn already exists, increate the stock of that book by 1
        if (promisesToDo[0]) {
            Book.findOneAndUpdate({ isbn: req.body.isbn }, { $inc: { stock: 1 } }, { new: true }, 
                function (err, book) {
                if (err) {
                    res.render('error/error', { message: "Error creating book", error: err });
                } else {
                    res.redirect('/backoffice/admin/book'); // Need to add error message
                }
            });
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
                                    res.redirect('/backoffice/admin/book');
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


exports.backoffice_admin_book_update_get = async function (req, res) {
    try {
        var book = await Book.findById(req.params.id);
        res.render('backoffice/admin/book/updateBook', { book: book });
    } catch (error) {
        res.render("error/error", { message: "Error updating book", error: error });
    }
}; // Done

exports.backoffice_admin_book_update_post = function (req, res) {
    Book.findOneAndUpdate( {"_id.$oid": req.params.id}, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating book", error: err });
        } else {
            res.redirect('/backoffice/admin/book');
        }
    });
}; // Done

exports.backoffice_admin_book_search_post = async function (req, res) {
    try {
        // find using the index $**
        console.log(req.body.search);
        var books = await Book.find({ $text: { $search: req.body.search } });
        res.render('backoffice/admin/book/manageBooks', { books: books });
    } catch (error) {
        res.render("error/error", { message: "Error searching books", error: error });
    }
}; // Done


exports.backoffice_admin_book_delete_post = (req, res) => {
    Book.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting book", error: err });
        } else {
            res.redirect('/backoffice/admin/book'); // Need to add success message
        }
    });
}; // Done


// --------------------- Backoffice/Admin/Sale ---------------------------
// Everything Todo

exports.backoffice_admin_sale_get = function (req, res) {
    res.render('backoffice/admin/sale/listSales');
};

exports.backoffice_admin_make_sale_get = function (req, res) {
    res.render('backoffice/admin/sale/makeSale');
};

exports.backoffice_admin_make_sale_post = function (req, res) {
    res.render('NotImplemented');
};


// --------------------- Backoffice/Admin/Manage Points ---------------------------
exports.backoffice_admin_managepoints_get = async function (req, res) {
    try {
        var points = await Points.find();
        res.render('backoffice/admin/managePoints/managePoints', { points: points });
    } catch (error) {
        res.render("error/error", { message: "Error managing points", error: error });
    }
}; 

exports.backoffice_admin_managepoints_post = function (req, res) {
    Points.findByIdAndUpdate("6263cd56c237f33c33e987b7", req.body, { new: true },
        function (err, points) {
        if (err) {
            res.render('error/error', { message: "Error managing points", error: err });
        } else {
            res.redirect('/backoffice/admin/managePoints');
        }
    });
};

