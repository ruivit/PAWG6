var fs = require('fs');

const pointsIDcollection = "628f8e0357a2e0f1b8541354";
const discountIDcollection = "628f8d9857a2e0f1b8541351";

// ----------------------- Models ------------------------------
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var TempBook = require('../models/tempBookModel');
var UsedBook = require('../models/usedBookModel');
var Sale = require('../models/saleModel');

var nodemailer = require('nodemailer');
var Points = require('../models/pointsModel');
var Discount = require('../models/discountModel');
const { type } = require('os');

// ------------------- Auxiliary Functions ---------------------------
function getDateNow(date) {
    var d = new Date();
    dateNowString = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return dateNowString;
}

// Quando um cliente submete um livro para avaliação, é enviado um email ao administrador

function sendMail(text) {
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'tugatobito@outlook.pt',
            pass: 'bah54321'
        }
    });

    var mailOptions = {
        from: 'tugatobito@outlook.pt',
        to: '8210227@estg.ipp.pt',
        subject: 'Sending Email using Node.js',
        text: 'O cliente ' + text.provider + ' pretende vender o livro ' + 
        text.title + ' a um preço de ' + text.sellPrice + '€'
      };
      

      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      transporter.close();
}

// Quando um cliente submete um livro para avaliação, se o livro for corretamente adicionado,
// é enviado um email ao cliente com a informaçãosubtida

function sendMailClient(text) {
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'tugatobito@outlook.pt',
          pass: 'bah54321'
        }
      });
      
      var mailOptions = {
        from: 'tugatobito@outlook.pt',
        to: '8210227@estg.ipp.pt',
        subject: 'Sending Email using Node.js',
        text: 'A sua proposta foi submtida com sucesso, com a seguinte informação\n\n'+
        'O cliente' + text.provider + ' pretende vender o livro ' + text.title + 
        ' a um preço de ' + text.sellPrice + '€' + '\n\n' + 
        'Por favor, aguarde a nossa resposta, tentaremos ser breves.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    transporter.close();
}




// -------------------- Client/API ---------------------------

exports.client_new_books_get = function (req, res) {
    switch (req.query.type) {
        case 'new':
            Book.find({}, function (err, books) {
                if (err) {
                    res.render('error/error', { error: err });
                } else {
                    res.status(200).json(books);
                }
            }).sort({ dateAdded: -1 }).limit(6);
            break;
        case 'used':
            UsedBook.find({}, function (err, books) {
                if (err) {
                    res.render('error/error', { error: err });
                } else {
                    res.status(200).json(books);
                }
            }).sort({ dateAdded: -1 }).limit(6);
            break;
        default:
            res.status(404).json({ msg: 'Invalid type' });
            break;
    }
}; // Get all the books


exports.client_register_post = async function (req, res) {

    // find client by username and/or email
    var duplClient = await Client.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (duplClient) {
        res.status(409).json({ msg: 'Client already exists' });
    } else {
        var client = new Client({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            birthDate: req.body.birthDate,
            dateString: getDateNow(req.body.birthDate),
            ageType: req.body.ageType,
            password: req.body.password,
        });

        client.setPassword(req.body.password);

        var pointsData = await Points.findOne({});
        var pointsGained = pointsData.recomendationClient;

        // If the client was recommended by an existing client
        var recommendedClient = await Client.findOne({ email: req.body.recommendation });

        if (recommendedClient) {
            client.points += pointsGained;
            client.save(function (err) { if (err) { return err; } }); 
            res.status(201).json({ message: 'Registration Successfull', 
            wasRecommended: true });
        } else {
            client.save(function (err) { if (err) { return err; } });
            res.status(201).json({ message: 'Registration Successfull', 
            wasRecommended: false });
        }
    }
}; // Register a new client

exports.client_login_post = function (req, res) {
    Client.findOne({ username: req.body.username }, function (err, client) {
        if (err) { res.status(500).json(err); }
        else if (!client) { res.status(404).json({ message: 'Cliente não encontrado' }); }
        else {
            if (client.checkPassword(req.body.password)) {
                res.status(200).json(
                    { message: 'Login efetuado com sucesso',
                    username: client.username,
                    name: client.name,
                    ageType: client.ageType,
                    clientID: client._id });
            } else {
                res.status(401).json({ message: 'Password errada' });
            }
        }
    });
}; // Login a client



exports.client_points_get = function (req, res) {
    Client.findOne({ username: req.query.username }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { error: err });
        } else {
            res.status(200).json(client.points);
        }
    });
}

exports.points_table_get = async function (req, res) {
    var pointsTable = await Points.findById(pointsIDcollection);
    res.status(200).json(pointsTable);
};

exports.discount_table_get = async function (req, res) {
    var discountTable = await Discount.findById(discountIDcollection);
    res.status(200).json(discountTable);
};

exports.client_make_sale_post = function (req, res) {
    // Make the sale
    var sale = new Sale({
        clientUsername: req.body.clientUsername.toString(),
        books: JSON.parse(req.body.books),
        total: req.body.total,
        gainedPoints: req.body.gainedPoints,
        date: req.body.date,
        dateString: getDateNow(),
        online: true,
        shipping: req.body.shipping,
    });

    // Update the client's points
    Client.findOne({ username: req.body.clientUsername }, function (err, client) {
        if (err) { res.status(500).json(err); }
        else {
            client.points += sale.gainedPoints;
            client.save(function (err) { if (err) { return err; } });
        }
    });

    // Save the sale
    sale.save(function (err) { 
        if (err) { 
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(201).json({ msg: 'Sale Successfull! +' + sale.gainedPoints + ' points' });
        }
    });
}; // Make a sale



exports.client_search_get = function (req, res) {
    var term = req.params.term;
    var bookType = req.params.bookType;
    switch (bookType) {
        case "new":
            console.log("New");
            Book.find({
                $or: [
                    { title: { $regex: term, $options: 'i' } },
                    { author: { $regex: term, $options: 'i' } },
                ]
            }, function (err, books) {
                if (err) {
                    res.render('error/error', { error: err });
                } else {
                    res.status(200).json(books);
                }
            });
            break;

        case "used":
            console.log("Used");
            UsedBook.find({
                $or: [
                    { title: { $regex: term, $options: 'i' } },
                    { author: { $regex: term, $options: 'i' } },
                ]
            }, function (err, books) {
                if (err) {
                    res.render('error/error', { error: err });
                } else {
                    res.status(200).json(books);
                }
            });
            break;
        }
}; // Search for books

exports.client_sell_tempbook_post = function (req, res) {
    var tempBook = new TempBook({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        editor: req.body.editor,
        resume: req.body.resume,
        isbn: req.body.isbn,
        provider: req.body.provider,
        sellPrice: req.body.sellPrice
    });
    console.log(req.body);

    tempBook.save(function (err) {
        if (err) {
            res.render('error/error', { message: "Error creating used book", error: err });
        }
    });

     // save the cover
     if (req.file) {
        fs.writeFileSync("./public/images/books/" + tempBook._id + ".jpg", req.file.buffer);
    }

    //sendMailClient(tempBook);
    //sendMail(tempBook);
        
    res.status(200).json( { message: "Used book created successfully" } );

}; // Sell a used book

exports.client_mypurschases_get = async function (req, res) {
    var sales = await Sale.find({ clientUsername: req.query.username });
    console.log(sales);
    // Get the book title
    for (var sale = 0; sale < sales.length; sale++) {
        for (var book = 0; book < sales[sale].books.length; book++) {
            var bookFound = await Book.findById(sales[sale].books[book]._id);
            sales[sale].booksTitle[book] = bookFound.title;
        }
    }
    res.status(200).json(sales);
}; // Get all the sales made by the client           


exports.client_mysoldbooks_get = function (req, res) {
    UsedBook.find({ provider: req.query.username }, function (err, usedBooks) {
        if (err) {
            res.render('error/error', { error: err });
        } else {
            res.status(200).json(usedBooks);
        }
    }).sort({ dateAdded: -1 }); 
}; // Get all the used books sold by the clients
