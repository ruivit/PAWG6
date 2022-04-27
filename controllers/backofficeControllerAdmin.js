const { redirect } = require('express/lib/response');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');

var Book = require('../models/bookModel');
var Author = require('../models/authorModel');
var Editor = require('../models/editorModel');

var Sale = require('../models/saleModel');
var Points = require('../models/pointsModel');
var Discount = require('../models/discountModel');

// ---------------------- Auxiliary Functions ------------------------
function CheckSession(req, res) {
    if (!req.session) {
        req.session.destroy();
        res.redirect('/backoffice/');
    }
}

// --------------------- Backoffice/Admin/ ---------------------------

exports.backoffice_admin_get = function (req, res) {
    if (req.session.username !== "admin") {
        res.render('backoffice/backofficeLogin');
    } else {
        res.render('backoffice/backofficeIndex', { admin: true });
    }
}; // Get the admin portal (after login)


// --------------------- Backoffice/Admin/Employee ---------------------------

exports.backoffice_admin_employee_get = async function (req, res) {
    try {
        var employees = await Employee.find();
        res.render('backoffice/admin/employee/manageEmployees', { employees: employees });
    }
    catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
}; // List/show the employees

exports.backoffice_admin_employee_create_get = function (req, res) {
    res.render('backoffice/admin/employee/createEmployee');
}; // Get the form to create a new employee

exports.backoffice_admin_employee_create_post = function (req, res) {
    // Using promises to search for username and email already in use
    var usernamePromise = Employee.findOne({ username: req.body.username });
    var emailPromise = Employee.findOne({ email: req.body.email });
    
    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
    // If the username or email already exists, redirect to the create page, with an error message
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
                address: req.body.address,
                admin: false,
            });

            employee.save(function (err) {
                if (err) {
                    res.render('error/error', { message: "Error creating employee", error: err });
                } else {
                    // Milestone2 - add message of success
                    res.redirect('/backoffice/admin/employee');
                }
            });
        }
    });
}; // Creating process for a new employee


exports.backoffice_admin_employee_update_get = async function (req, res) {
    try {
        var employee = await Employee.findById(req.params.id);
        res.render('backoffice/admin/employee/updateEmployee', { employee: employee });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error/error", { message: "Error updating employee", error: error });
    }
}; // Form to update an employee

exports.backoffice_admin_employee_update_post = function (req, res) {
    Employee.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, employee) {
        if (err) {
            res.render('error/error', { message: "Error updating employee", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/employee');
        }
    });
}; // Update an employee (by ID, parsed via multer)
    

exports.backoffice_admin_employee_delete_post = function (req, res) {   
    Employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/employee'); // Need to add success message
        }
    });
}; // Delete a employee (by ID, parsed via multer)


// --------------------- Backoffice/Admin/Client ---------------------------

exports.backoffice_admin_client_get = async function (req, res) {
    try {
        var clients = await Client.find();
        res.render('backoffice/admin/client/manageClients', { clients: clients });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
}; // List/show the clients

exports.backoffice_admin_client_create_get = function (req, res) {
    res.render('backoffice/admin/client/createClient');
}; // Get the form to create a new client

exports.backoffice_admin_client_create_post = function (req, res) {
    function calculatePoints(points) {
        var totalPoints = 0;
        if (points == "" || points == null) {
            return 10;
        } else {
            // Milestone2 - logica de negocio
            return totalPoints;
        }
    }

    function calculateAgeType(birthDate) {
        var age = new Date().getFullYear() - birthDate.substring(0, 4);;
        if (age < 10) {
            return "Infatil";
        } else if (age > 10 && age <= 18) {
            return "Juvenil";
        } else if (age > 18 && age <= 60) {
            return "Adulto";
        } else {
            return "Senior";
        }
    }

    // Using promises to search for username and email already in use
    var usernamePromise = Client.findOne({ username: req.body.username });
    var emailPromise = Client.findOne({ email: req.body.email });
    
    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
    // If the username or email already exists, redirect to the create page, with an error message
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
            points: calculatePoints(req.body.points), // Milestone2
            birthDate: req.body.birthDate,
            ageType: calculateAgeType(req.body.birthDate),
        });

        client.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating client", error: err });
            } else {
                // Milestone2 - add message of success
                res.redirect('/backoffice/admin/client');
            }
        });
        }
    });
}; // Creating process for a new client


exports.backoffice_admin_client_update_get = async function (req, res) {
    try {
        var client = await Client.findById(req.params.id);
        res.render('backoffice/admin/client/updateClient', { client: client });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error/error", { message: "Error updating client", error: error });
    }
}; // Get the form to update a client (by ID, parsed via multer)

exports.backoffice_admin_client_update_post = async function (req, res) {
    // Check if the data being updated is valid, email
    emailPromise = Client.findOne({ email: req.body.email });
    if (emailPromise) {
        var client = await Client.findOne({ username: req.body.username });
        res.render('backoffice/admin/client/updateClient',
        { client: client, message: "Email already exists" });
    } else {
        // If the data is valid, update the client
        Client.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
            function (err, client) {
            if (err) {
                res.render('error/error', { message: "Error updating client", error: err });
            } else {
                // Milestone2 - add message of success
                res.redirect('/backoffice/admin/client');
            }
        });
    }
}; // Update a client (by ID, parsed via multer)


exports.backoffice_admin_client_delete_post = function (req, res) {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/client');
        }
    });
}; // Delete a client (by ID, parsed via multer)


exports.backoffice_admin_client_search_post = async function (req, res) {
    try {
        // check if the text parsed are only numbers, if yes then we are searching by phoneNumber
        regex = /^[0-9]+$/;

        if (RegExp(regex).test(req.body.search)) {

            var clients = await Client.find({ phone: req.body.search });
            res.render('backoffice/admin/client/manageClients', { clients: clients });

        } else { // if not, we are searching by username or email

            var clients = await Client.find({ $or:[
                { username: { $regex: req.body.search, $options: 'i' } },
                { email: { $regex: req.body.search, $options: 'i' } },
            ] });

            res.render('backoffice/admin/client/manageClients', { clients: clients });
        }

    } catch (error) {
        res.render("error/error", { message: "Error searching Client", error: error });
    }

}; // Search function for clients (by username, email, or phoneNumber)



// --------------------- Backoffice/Admin/Book ---------------------------

exports.backoffice_admin_book_get = async function (req, res) {
    try {
        var books = await Book.find();
        res.render('backoffice/admin/book/manageBooks', { books: books });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
}; // List/show the books

exports.backoffice_admin_book_create_get = function (req, res) {
    res.render('backoffice/admin/book/createBook');
}; // Get the form to create a new book

/* Apenas fazemos verificação do ISBN, pois se for uma venda do cliente,
 o campo "forSale" será false e ficará a aguardar validação */
exports.backoffice_admin_book_create_post = function (req, res) {
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    // Use promises to search for ISBN already in use
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        // If the isbn already exists
        if (promisesToDo[0]) {
            oldata = req.body;
            res.render('backoffice/admin/book/createBook', 
            { oldata: oldata, message: "ISBN already exists" });
        } else {
            
        // Format the date in DD/MM/YYYY HH:MM
        var d = new Date();
        dateNowString = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        // If the isbn is not already in use, create the book
        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            editor: req.body.editor,
            resume: req.body.resume,
            isbn: req.body.isbn,
            dateString: dateNowString,
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
                                    res.render('error/error', 
                                    { message: "Error creating author", error: err });
                                }
                            });
                        } else {
                            // Add the book to the array of books of the author
                            author.books.push(book);
                            author.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating author", error: err });
                                }
                            });
                        }
                    }
                }); // Author end

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
                                    res.render('error/error', 
                                    { message: "Error creating editor", error: err });
                                }
                            });
                        } else {
                            // Add the book to the array of books of the editor
                            editor.books.push(book);
                            editor.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating editor", error: err });
                                } else {
                                    // Milestone2 - add message of success
                                    res.redirect('/backoffice/admin/book');
                                }
                            });
                        }
                    }
                }); // Editor end
            }
        }); // Book save end
        }
    }); // Promise end
}; // Create a new book


exports.backoffice_admin_book_update_get = async function (req, res) {
    try {
        var book = await Book.findById(req.params.id);
        res.render('backoffice/admin/book/updateBook', { book: book });
    } catch (error) {
        res.render("error/error", { message: "Error updating book", error: error });
    }
}; // Get the form to update a book

exports.backoffice_admin_book_update_post = function (req, res) {
    Book.findOneAndUpdate( {"_id.$oid": req.params.id}, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating book", error: err });
        } else {
            res.redirect('/backoffice/admin/book');
        }
    });
}; // Update a book (by id)


exports.backoffice_admin_book_delete_post = function (req, res) {
    Book.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting book", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/book');
        }
    });
}; // Delete a book (by id)

exports.backoffice_admin_book_search_post = async function (req, res) {
    try {
        // check if the text parsed are only number, if yes we are searching by ISBN
        regex = /^[0-9]+$/;

        if (RegExp(regex).test(req.body.search)) {
            var books = await Book.find({ isbn: req.body.search });

            res.render('backoffice/admin/book/manageBooks', { books: books });

        // if we are searching true or false, we are searching by the forSale field
        } else if (req.body.search == "true" || req.body.search == "false") {
            var books = await Book.find({ $or:[
                { forSale: req.body.search } ] });

            res.render('backoffice/admin/book/manageBooks', { books: books });

        // else, we are searching by the title, author or editor
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
}; // Search a book



// --------------------- Backoffice/Admin/Sale ---------------------------

exports.backoffice_admin_sales_get = async function (req, res) {
    CheckSession(req, res);
    try {
        var sales = await Sale.find();
        for (var i = 0; i < sales.length; i++) {
            // Get the title of the books
            for (var j = 0; j < sales[i].books.length; j++) {
                var book = await Book.findById(sales[i].books[j]._id);
                sales[i].books[j].title = book.title;
            }

            // Get the username of the employee
            var employee = await Employee.findById(sales[i].employee_id);
            sales[i].employeeUsername = employee.username;
        }
        res.render('backoffice/admin/sales/manageSales', { sales: sales });
    } catch (error) {
        res.render("error/error", { message: "Error getting sales", error: error });
    }
};

exports.backoffice_admin_make_sale_get = async function (req, res) {
    try {
        var books = await Book.find();
        res.render('backoffice/admin/sales/makeSale', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding sales", error: error });
    }
};

exports.backoffice_admin_make_sale_post = async function (req, res) {
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
                res.render('backoffice/admin/sales/makeSale', 
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
                        res.redirect('/backoffice/admin/sales');
                    }
                });
            }
        }
    });
};

exports.backoffice_admin_sale_search = async function (req, res) {
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

            res.render('backoffice/admin/sales/manageSales', { sales: sales });
        } else {
            // else, we are search for client username (only)
            var sales = await Sale.find({ $or:[
                { clientUsername: { $regex: req.body.search, $options: 'i' } }
            ] });

            // get the title of the books
            await getTitleBooks(req, res, sales);
            await getEmployeeUsername(req, res, sales);

            res.render('backoffice/admin/sales/manageSales', { sales: sales });
        }
    } catch (error) {
        res.render("error/error", { message: "Error searching sale", error: error });
    }
};


// --------------------- Backoffice/Admin/Manage Points ---------------------------

exports.backoffice_admin_managepoints_get = async function (req, res) {
    try {
        var points = await Points.findById("62650c0098b8a1abe1af3bdc");
        res.render('backoffice/admin/managePoints/managePoints', { points: points });
    } catch (error) {
        res.render("error/error", { message: "Error getting points", error: error });
    }
}; // Get the form to update the points

exports.backoffice_admin_managepoints_post = function (req, res) {
    Points.findByIdAndUpdate("62650c0098b8a1abe1af3bdc", req.body, { new: true },
        function (err, points) {
        if (err) {
            res.render('error/error', { message: "Error managing points", error: err });
        } else {
            res.redirect('/backoffice/admin');
        }
    });
}; // Update the points table

// --------------------- Backoffice/Admin/Manage Discount ---------------------------

exports.backoffice_admin_managediscount_get = async function (req, res) {
    try {
        var discount = await Discount.findById("62667eb941eac5eecb5f4e3a");
        res.render('backoffice/admin/manageDiscount/manageDiscount', { discount: discount });
    } catch (error) {
        res.render("error/error", { message: "Error getting discount", error: error });
    }
}; // Get the form to update the discount

exports.backoffice_admin_managediscount_post = function (req, res) {
    Discount.findByIdAndUpdate("62667eb941eac5eecb5f4e3a", req.body, { new: true },
        function (err, discount) {
        if (err) {
            res.render('error/error', { message: "Error managing points", error: err });
        } else {
            res.redirect('/backoffice/admin');
        }
    });
}; // Update the discount table

