const { redirect } = require('express/lib/response');
const { body, validationResult } = require("express-validator");

// ----------------------- Models ------------------------------

const { session } = require('passport/lib');


// -------------------- Backoffice/ ---------------------------

// Login Portal
exports.backoffice_login_get = function (req, res) {
    res.render('backoffice/backofficeLogin');
};

// Login Process
exports.backoffice_login_post = function (req, res) {
    res.render('NotImplemented');
};

// Logout Process
exports.backoffice_logout = function (req, res) {
    session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('index/index');
        }
    });
};


// --------------------- Backoffice/Admin/ ---------------------------

exports.backoffice_admin_get = function (req, res) {
    res.render('backoffice/admin/adminIndex');
};


// --------------------- Backoffice/Admin/Employee ---------------------------

exports.backoffice_admin_employee_get = async function (req, res) {
    try {
        var employees = await Employee.find().populate('username');
        res.render('backoffice/admin/employee/listEmployee', { employees: employees });
    }
    catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
}; // Need the model

exports.backoffice_admin_employee_create_get = function (req, res) {
    res.render('backoffice/admin/employee/createEmployee');
};

exports.backoffice_admin_employee_create_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_employee_update_get = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_employee_update_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_employee_delete_post = function (req, res) {
    res.render('NotImplemented');
};


// --------------------- Backoffice/Admin/Client ---------------------------

exports.backoffice_admin_client_get = async function (req, res) {
    try {
        var employees = await Employee.find().populate('username');
        res.render('backoffice/admin/client/listClient', { employees: employees });
    } catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
    res.render('backoffice/admin/client/listClient');
}; // Need to create model

exports.backoffice_admin_client_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_client_update_get = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_client_update_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_client_delete_post = function (req, res) {
    res.render('NotImplemented');
};


// --------------------- Backoffice/Admin/Book ---------------------------

exports.backoffice_admin_book_get = async function (req, res) {
    try {
        var books = await Book.find();
        res.render('backoffice/admin/book/listBook', { books: books });
    } catch (error) {
        res.render("error", { message: "Error finding books", error: error });
    }
};

exports.backoffice_admin_book_create_get = function (req, res) {
    res.render('backoffice/admin/book/createBook');
};

exports.backoffice_admin_book_create_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_book_update_get = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_book_update_post = function (req, res) {
    res.render('NotImplemented');
};

exports.backoffice_admin_book_delete_post = function (req, res) {
    res.render('NotImplemented');
};


// --------------------- Backoffice/Admin/Sale ---------------------------

exports.backoffice_admin_sale_get = function (req, res) {
    res.render('backoffice/admin/sale/listSale');
};

exports.backoffice_admin_sale_get = function (req, res) {
    res.render('backoffice/admin/sale/makeSale');
};

exports.backoffice_admin_sale_post = function (req, res) {
    res.render('NotImplemented');
};






/* List the employees
exports.employees = async function (req, res) {
    try {
        var employees = await Employee.find().populate('username');
        res.render("employees/employees", { employees: employees });
    } catch (error) {
        res.render("error", { message: "Error finding employees", error: error });
    }
};

// List all clients
exports.clients = async function (req, res) {
    try {
        var clients = await Client.find().populate('username');
        res.render("client/clients", { clients: clients });
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
};

// Form to create a employee
exports.employees_create_get = function (req, res) {
    res.render('employees/createEmployee');
};


// -------------------- POST Requests ---------------------------

// Create a new employee
exports.employees_create_post = (req, res) => {

    
    // Using promises to validate the data
    var usernamePromise = Employee.findOne({ username: req.body.username });
    var emailPromise = Employee.findOne({ email: req.body.email });

    // Wait for the promises to resolve
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page
        if (promisesToDo[0]) {
            res.render('employees/createEmployee', { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('employees/createEmployee', { oldata: req.body, message: "Email already exists" });
        }
    }).then(function () {
        // Create the employee
        var employee = new Employee(
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
        });
        employee.save(function (err) {
            if (err) {
                res.render('error', { message: "Error creating employee", error: err });
            } else {
                res.render('admin/adminPortal', { message: "Employee created successfully" });
            }
        });
    });
};

// Delete an employee
exports.employees_delete_post = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            res.render('admin/adminPortal', { message: "Employee deleted successfully" });
        }
    });
};


exports.admin_login_post = function (req, res) {
    data = req.body;
    var username = data.username;
    var password = data.password;

    session = req.session;
    session.username = username;
    session.password = password;

    body('username').isLength({ min: 1 }).trim().withMessage('Username cannot be blank'),
        body('password').isLength({ min: 1 }).trim().withMessage('Password cannot be blank'),

        (req, res) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        };

    // check if the username and password match (admin)
    // TODO - check in the database, and if its admin or employee
    if (session.username == "admin" && session.password == "admin") {
        res.redirect('/admin');
    } else {
        session.destroy();
        res.redirect('/admin/login');
    }
};

exports.logout = function (req, res) {
    session = req.session;
    session.destroy(function (err) {
        if (err) { console.log(err); }
        res.writeHead(302, { 'Location': '/' });
        res.end();
    });
};

*/