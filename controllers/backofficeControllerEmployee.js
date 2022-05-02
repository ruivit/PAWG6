const { redirect } = require('express/lib/response');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var Sale = require('../models/saleModel');
var Author = require('../models/authorModel');
var Editor = require('../models/editorModel');

// ------------------- Auxiliary Functions ---------------------------
function getDateNow(date) {
    var d = new Date();
    dateNowString = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return dateNowString;
}


// --------------------- Backoffice/employee/ ---------------------------

exports.backoffice_employee_get = function (req, res) {
    res.render('backoffice/backofficeIndex', { admin: false });
}; // Get the employee portal (after login)


// --------------------- Backoffice/employee/Client ---------------------------

exports.backoffice_employee_client_get = async function (req, res) {
    try {
        var clients = await Client.find();
        res.render('backoffice/employee/client/manageClients', { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
}; // List/show the employees

exports.backoffice_employee_client_create_get = function (req, res) {
    res.render('backoffice/employee/client/createClient');
}; // Get the form to create a new employee

exports.backoffice_employee_client_create_post = function (req, res) {
    function calculatePoints(points) {
        var totalPoints = 0;
        if (points == "" || points == null) {
            return 10;
        } else {
            return totalPoints;
        }// else, logica de negocio
    }

    // Using promises to search for username and/or email already in use
    var usernamePromise = Client.findOne({ username: req.body.username });
    var emailPromise = Client.findOne({ email: req.body.email });
    
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
                res.redirect('/backoffice/employee/client');
            }
        });
        }
    });
}; // Creating process for a new client


exports.backoffice_employee_client_update_get = async function (req, res) {
    try {
        var client = await Client.findById(req.params.id);
        res.render('backoffice/employee/client/updateClient', { client: client });
    } catch (error) {
        res.render("error/error", { message: "Error updating client", error: error });
    }
}; // Form to update a client

exports.backoffice_employee_client_update_post = async function (req, res) {
    Client.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating client", error: err });
        } else {
            res.redirect('/backoffice/employee/client');
        }
    });
}; // Update the client

exports.backoffice_employee_client_search_post = async function (req, res) {
    try {
        // check if the text parsed are only number
        regex = /^[0-9]+$/;

        if (RegExp(regex).test(req.body.search)) {

            var clients = await Client.find({ phone: req.body.search });
            res.render('backoffice/employee/client/manageClients', { clients: clients });

        } else {

            var clients = await Client.find({ $or:[
                { username: { $regex: req.body.search, $options: 'i' } },
                { email: { $regex: req.body.search, $options: 'i' } },
            ] });

            res.render('backoffice/employee/client/manageClients', { clients: clients });
        }
    } catch (error) {
        res.render("error/error", { message: "Error searching Client", error: error });
    }
}; // Search for a client



exports.backoffice_employee_client_delete_post = function (req, res) {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            res.redirect('/backoffice/employee/client'); // Need to add success message
        }
    });
}; // Delete a client


// --------------------- Backoffice/employee/Book ---------------------------

exports.backoffice_employee_book_get = async function (req, res) {
    try {
        var perPage = 5;
        var total = await Book.countDocuments();
        var totalPages = Math.ceil(total / perPage);
        var currentPage = req.query.page || 1;
        var start = (currentPage - 1) * perPage;
        var lastPage = start + perPage;

        // convert currentPage to integer
        currentPage = parseInt(currentPage);

        var books = await Book.find().skip(start).limit(perPage);
        res.render('backoffice/employee/book/manageBooks', 
        { pages: totalPages, currentPage: currentPage, lastPage: lastPage, books: books });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
}; // List/show the books


exports.backoffice_employee_book_create_get = function (req, res) {
    res.render('backoffice/employee/book/createBook');
}; // Get the form to create a book

exports.backoffice_employee_book_create_post = function (req, res) {
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        // If the isbn already exists
        if (promisesToDo[0]) {
            oldata = req.body;
            res.render('backoffice/employee/book/createBook', 
            { oldata: oldata, message: "ISBN already exists" });
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
                }); // End author

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
                }); // End editor
            }
        }); // Book save
        }
    }); // End promise
}; // Done     


exports.backoffice_employee_book_update_get = async function (req, res) {
    try {
        var book = await Book.findById(req.params.id);
        res.render('backoffice/employee/book/updateBook', { book: book });
    } catch (error) {
        res.render("error/error", { message: "Error updating book", error: error });
    }
}; // Get the form to update the book

exports.backoffice_employee_book_update_post = function (req, res) {
    Book.findOneAndUpdate( {"_id.$oid": req.params.id}, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating book", error: err });
        } else {
            res.redirect('/backoffice/employee/book');
        }
    });
}; // Update book

exports.backoffice_employee_book_search_post = async function (req, res) {
    try {
        // check if the text parsed are only number
        regex = /^[0-9]+$/;

        if (RegExp(regex).test(req.body.search)) {

            var books = await Book.find({ isbn: req.body.search });
            res.render('backoffice/employee/book/manageBooks', { books: books });

        } else if (req.body.search == "true" || req.body.search == "false") {

            var books = await Book.find({ $or:[
                { forSale: req.body.search } ] });

            res.render('backoffice/employee/book/manageBooks', { books: books });

        } else {

            var books = await Book.find({ $or:[
                { title: { $regex: req.body.search, $options: 'i' } },
                { author: { $regex: req.body.search, $options: 'i' } },
                { editor: { $regex: req.body.search, $options: 'i' } }
            ] });

            res.render('backoffice/employee/book/manageBooks', { books: books });
        }

    } catch (error) {
        res.render("error/error", { message: "Error searching book", error: error });
    }
}; // Search books


exports.backoffice_employee_book_delete_post = function (req, res) {
    Book.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting book", error: err });
        } else {
            res.redirect('/backoffice/employee/book'); // Need to add success message
        }
    });
}; // Delete book


// --------------------- Backoffice/employee/Sale ---------------------------

exports.backoffice_employee_sale_get = async function (req, res) {
    try {
        var sales = await Sale.find({});
        for (var i = 0; i < sales.length; i++) {
            // Get the title of the books
            for (var j = 0; j < sales[i].books.length; j++) {
                var book = await Book.findById(sales[i].books[j]._id);
                sales[i].books[j].title = book.title;
            }
        
            // Get username of the employee
            var employee = await Employee.findById(sales[i].employee_id);
            sales[i].employeeUsername = employee.username;
        }
        res.render('backoffice/employee/sales/employeeManageSales', { sales: sales });
    } catch (error) {
        res.render("error/error", { message: "Error getting sales", error: error });
    }
}; // List/show the sales

exports.backoffice_employee_make_sale_get = async function (req, res) {
    try {
        var books = await Book.find();
        res.render('backoffice/employee/sales/employeeMakeSale', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding sales", error: error });
    }
}; // Get the form to make a sale


exports.backoffice_employee_make_sale_post = async function (req, res) {
    function calculateTotal() {
        return 0;
    } // Milestone 2
    
    function calculateShipping() {
        return 0;
    } // Milestone 2
    
    // get the ID based on the username
    var books = await Book.find();
    Client.findOne({ username: req.body.clientUsername }, function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error finding user", error: err });
        } else {
            if (!client) {
                res.render('backoffice/employee/sales/employeeMakeSale', 
                { message: "User not found", books: books });
            } else {
                // Format the date in DD/MM/YYYY HH:MM
                var d = new Date();
                dateNowString = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

                // make the sale
                var sale = new Sale({
                    clientUsername: req.body.clientUsername,
                    books: req.body.bookId,
                    dateString: dateNowString,
                    total: calculateTotal(),
                    online: req.body.online,
                    employee_id: req.session.employeeID,
                    shipping: calculateShipping()
                });

                sale.save(function (err) {
                    if (err) {
                        res.render('error/error', { message: "Error creating sale", error: err });
                    } else {
                        // MileStone 2 - add success message
                        res.redirect('/backoffice/employee/sales');
                    }
                });
            }
        }
    });
}; // Make a sale
        
exports.backoffice_employee_sale_search = async function (req, res) {
    async function getTitleBooks (req, res, sales) {
        for (var i = 0; i < sales.length; i++) {
            for (var j = 0; j < sales[i].books.length; j++) {
                var book = await Book.findById(sales[i].books[j]._id);
                sales[i].books[j].title = book.title;
            }
        }
        return sales;
    }

    async function getEmployeeUsername (req, res, sales) {
        for (var i = 0; i < sales.length; i++) {
            var employee = await Employee.findById(sales[i].employee_id);
            sales[i].employeeUsername = employee.username;
        }
        return sales;
    }

    try {
        // if true or false, we are checking for online field
        if (req.body.search == "true" || req.body.search == "false") {
            var sales = await Sale.find({ online: req.body.search });

            // get the title of the books
            await getTitleBooks(req, res, sales);
            await getEmployeeUsername(req, res, sales);

            res.render('backoffice/employee/sales/employeeManageSales', { sales: sales });
        } else {
            // else, we are search for client username (only)
            var sales = await Sale.find({ $or:[
                { clientUsername: { $regex: req.body.search, $options: 'i' } }
            ] });

            // get the title of the books
            await getTitleBooks(req, res, sales);
            await getEmployeeUsername(req, res, sales);

            res.render('backoffice/employee/sales/employeeManageSales', { sales: sales });
        }
    } catch (error) {
        res.render("error/error", { message: "Error searching sale", error: error });
    }
}; // Search sales

// --------------------- Backoffice/employee/profile ---------------------------


exports.backoffice_employee_manageProfile_get = async function (req, res) {
    try {
        var employee = await Employee.findById(req.session.employeeID);
        res.render('backoffice/employee/employeeProfile/manageEmployeeProfile', { employee: employee });
    } catch (error) {
        res.render("error/error", { message: "Error updating profile", error: error });
    }
}; // List the employee information

exports.backoffice_employee__profile_update_get = async function (req, res) {
    try {
        var employee = await Employee.findById(req.session.employeeID);
        res.render('backoffice/employee/employeeProfile/updateEmployeeProfile', { employee: employee });
    } catch (error) {
        res.render("error/error", { message: "Error updating employee", error: error });
    }
}; // Get the form to update the employee 



exports.backoffice_employee_profile_update_post = async function (req, res) {
    Employee.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, employee) {
        if (err) {
            res.render('error/error', { message: "Error updating employee", error: err });
        } else {
            res.redirect('/backoffice/employee/profile');
        }
    });
}; // Update the profile