// ----------------------- Models ------------------------------
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var UsedBook = require('../models/UsedBookModel');
var Sale = require('../models/saleModel');
var Points = require('../models/pointsModel');



// ------------------- Auxiliary Functions ---------------------------
function getDateNow(date) {
    var d = new Date();
    dateNowString = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return dateNowString;
}

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


exports.client_points_get = function (req, res) {
    Client.findById(req.session.client._id, function (err, client) {
        if (err) {
            res.render('error/error', { error: err });
        } else {
            res.status(200).json(client.points);
        }
    });
}

exports.points_data_get = function (req, res) {
    Points.findById("62650c0098b8a1abe1af3bdc", function (err, points) {
        if (err) {
            res.render('error/error', { error: err });
        } else {
            res.status(200).json(points);
        }
    });
}

exports.client_make_sale_post = function (req, res) {
    console.log(req.body);
    try {
        var sale = new Sale({
            clientUsername: "client1",
            books: req.body.books,
            total: req.body.total,
            gainedPoints: req.body.gainedPoints,
            dateString: getDateNow(),
            online: true,
            shipping: req.body.shipping,
            date: req.body.date
        });

        sale.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating sale", error: err });
            } else {
                res.status(200).json(sale);
            }
        });
    } catch (err) {
        res.render('error/error', { message: "Error creating sale", error: err });
    }
}; // Make a sale