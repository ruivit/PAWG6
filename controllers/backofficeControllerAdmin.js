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
var Discount = require('../models/discountModel');


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

exports.backoffice_admin_client_create_post = function (req, res) {
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

// Apenas fazemos verificação do ISBN, pois se for uma venda do cliente o campo "forSale" será false e ficará a aguardar validação

exports.backoffice_admin_book_create_post = function (req, res) {
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    // Wait for the promises to resolve
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        // If the isbn already exists
        if (promisesToDo[0]) {
            oldata = req.body;
            res.render('backoffice/admin/book/createBook', { oldata: oldata, message: "ISBN already exists" });
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
        // check if the text parsed are only number
        regex = /^[0-9]+$/;

        if (RegExp(regex).test(req.body.search)) {
            var books = await Book.find({ isbn: req.body.search });
            res.render('backoffice/admin/book/manageBooks', { books: books });
        } else {
            var books = await Book.find({ $or:[ 
                { title: { $regex: req.body.search, $options: 'i' } }, 
                { author: { $regex: req.body.search, $options: 'i' } }, 
                { editor: { $regex: req.body.search, $options: 'i' } } 
            ] });
            res.render('backoffice/admin/book/manageBooks', { books: books });
        }
    } catch (error) {
        res.render("error/error", { message: "Error searching book", error: error });
    }
}; // Done          



exports.backoffice_admin_book_delete_post = function (req, res) {
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

exports.backoffice_admin_sale_get = async function (req, res) {
    if (req.body.filter) {
        // if filter is set to 'all', aka show all sales
        // if filter is set to 'pending', aka show only pending sales
        var sales = await Sale.find({ status: req.body.filter });
    } else {
        try {
            var sales = await Sale.find();
            res.render('backoffice/employee/sales/manageSales', { sales: sales });
        } catch (error) {
            res.render("error/error", { message: "Error getting sales", error: error });
        }
    }
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
        var points = await Points.findById("62650c0098b8a1abe1af3bdc");
        res.render('backoffice/admin/managePoints/managePoints', { points: points });
    } catch (error) {
        res.render("error/error", { message: "Error getting points", error: error });
    }
};

exports.backoffice_admin_managepoints_post = function (req, res) {
    Points.findByIdAndUpdate("62650c0098b8a1abe1af3bdc", req.body, { new: true },
        function (err, points) {
        if (err) {
            res.render('error/error', { message: "Error managing points", error: err });
        } else {
            res.redirect('/backoffice/admin');
        }
    });
}; // Done

// --------------------- Backoffice/Admin/Manage Discount ---------------------------

exports.backoffice_admin_managediscount_get = async function (req, res) {
    try {
        // create
        var discount = await Discount.findById("62667eb941eac5eecb5f4e3a");
        res.render('backoffice/admin/manageDiscount/manageDiscount', { discount: discount });
    } catch (error) {
        res.render("error/error", { message: "Error getting discount", error: error });
    }
};

exports.backoffice_admin_managediscount_post = function (req, res) {
    Discount.findByIdAndUpdate("62667eb941eac5eecb5f4e3a", req.body, { new: true },
        function (err, discount) {
        if (err) {
            res.render('error/error', { message: "Error managing points", error: err });
        } else {
            res.redirect('/backoffice/admin');
        }
    });
}; // Done

