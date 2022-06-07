var fs = require('fs');
var crypto = require('crypto');

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

function sendMailAdmin(text) {
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
        subject: 'New Proposal',
        text: 'O cliente ' + text.provider + ' pretende vender o livro ' +
            text.title + ' a um preço de ' + text.sellPrice + '€' + '\n\n' +
            'https://localhost/backoffice/admin/proposals'
    };



    transporter.sendMail(mailOptions, function (error, info) {
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
        subject: 'My Library - Your Proposal',
        text: 'A sua proposta foi submtida com sucesso, com a seguinte informação\n\n' +
            'O cliente' + text.provider + ' pretende vender o livro ' + text.title +
            ' a um preço de ' + text.sellPrice + '€' + '\n\n' +
            'Por favor, aguarde a nossa resposta, tentaremos ser breves.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
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
    console.log(req.body.birthDate + '\n' + 'this is the birthdate');
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
            recommendedBy: req.body.recommendedBy,
        });
    
        client.setPassword(req.body.password);

        var pointsData = await Points.findOne({});
        var pointsGained = pointsData.recomendationClient;

        // If the client was recommended by an existing client
        var recommendedClient = await Client.findOne({ email: req.body.recommendation });
        if (recommendedClient) {
            
            recommendedClient.points += pointsGained;
            console.log(client);
            client.save(function (err) { if (err) { return err; } });
            res.status(201).json({
                message: 'Registration Successfull',
                wasRecommended: true
            });
        } else {
            
            client.save(function (err) { if (err) { return err; } });
            console.log(client);
            res.status(201).json({
                message: 'Registration Successfull',
                wasRecommended: false
            });
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
                    {
                        message: 'Login efetuado com sucesso',
                        username: client.username,
                        name: client.name,
                        ageType: client.ageType,
                        clientID: client._id,
                        points: client.points,
                        totalBuys: client.totalBuys,
                    });
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


exports.client_update_password = function (req, res) {
    var salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 
    console.log(req.body.password);
    var newPasswordHash = crypto.pbkdf2Sync(req.body.password, salt,
        1000, 64, process.env.ENCRYPTION).toString('hex');

    Client.findOneAndUpdate({ username: req.body.username },
        { salt: salt, passwordHash: newPasswordHash }, { new: true },
        function (err, client) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json({ msg: 'Password Updated' });
            }
        }
    );
}; // Change the password of a client


exports.client_make_sale_post = async function (req, res) {
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


    // Save the sale
    sale.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(201).json({ msg: 'Sale Successfull! +' + sale.gainedPoints + ' points' });
        }
    });

    // Update the books' stock
    for (var i = 0; i < sale.books.length; i++) {
        Book.findByIdAndUpdate(sale.books[i]._id, {
            $inc:
                { stock: -1 }
        }, { new: true }, function (err, book) {
            if (err) {
                res.status(500).json(err);
            }
        });
    }

    // count the number of books bought
    var numberOfBooksBought = 0;
    for (var i = 0; i < sale.books.length; i++) {
        for (var j = 0; j < sale.books.length; j++) {
            if (sale.books[i]._id == sale.books[j]._id) {
                numberOfBooksBought++;
            }
        }
    }

    var pointsTable = await Points.findById(pointsIDcollection);
    // Update the client's points and totalBuys
    Client.findOne({ username: req.body.clientUsername }, function (err, client) {
        if (err) { res.status(500).json(err); }
        else {
            client.points += sale.gainedPoints;
            if ( req.body.shipping == 0 ) {
                client.points -= pointsTable.shippingPoints;
            }

            client.totalBuys += numberOfBooksBought;
            client.save(function (err) { if (err) { return err; } });
        }
    });

}; // Make a sale


exports.client_sell_tempbook_post = function (req, res) {
    console.log('Cheguei aqui');
    console.log(req.body);
    console.log(req.body.tempBookModel.title);


    var tempBook = new TempBook({
        title: req.body.tempBookModel.title,
        author: req.body.tempBookModel.author,
        genre: req.body.tempBookModel.genre,
        editor: req.body.tempBookModel.editor,
        resume: req.body.tempBookModel.resume,
        isbn: req.body.tempBookModel.isbn,
        dateAdded: req.body.tempBookModel.dateAdded,
        dateString: req.body.tempBookModel.dateString,
        provider: req.body.tempBookModel.provider,
        sellPrice: req.body.tempBookModel.sellPrice,
    });
    console.log('tempBook');
    console.log(tempBook);

    tempBook.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(201).json({ msg: 'TempBook Successfull!' });
        }
    });
    // Sell a tempBook
    /* 
         // save the cover
         if (req.file) {
            fs.writeFileSync("./public/images/books/" + tempBook._id + ".jpg", req.file.buffer);
        }
     */
    sendMailClient(tempBook);
    setTimeout(function () {
        sendMailAdmin(tempBook);
    }, 5000);
    

};// Sell a used book


exports.client_sales_get = async function (req, res) {
    var sales = await Sale.find({ clientUsername: req.query.username });

    booksInfo = Array();
    for (var i = 0; i < sales.length; i++) {
        for (var j = 0; j < sales[i].books.length; j++) {
            var book = await Book.findById(sales[i].books[j]);
            count = 0;
            // count the number of bought books by title
            if (!booksInfo.includes(book.title)) {
                for (var k = 0; k < sales.length; k++) {
                    for (var l = 0; l < sales[k].books.length; l++) {
                        var book2 = await Book.findById(sales[k].books[l]);
                        if (book.title == book2.title) {
                            count++;
                        }
                    }
                }
                booksInfo.push(book.title);
                booksInfo.push("(" + count + "x)");
            }
        }
    }

    // include the booksInfo in the sales
    for (var i = 0; i < sales.length; i++) {
        sales[i].booksInfo = booksInfo;
    }

    res.status(200).json(sales);
}; // Get all the sales made by the client           


exports.client_soldbooks_get = function (req, res) {
    UsedBook.find({ provider: req.query.username }, function (err, usedBooks) {
        if (err) {
            res.render('error/error', { error: err });
        } else {
            console.log(usedBooks);
            res.status(200).json(usedBooks);
        }
    }).sort({ dateAdded: -1 });
}; // Get all the used books sold by the clients


exports.client_search_get = function (req, res) {
    var term = req.query.term;
    var bookType = req.query.bookType;

    switch (bookType) {
        case "new":
            if (RegExp(/^[0-9]+$/).test(term)) {
                Book.find({ isbn: term }, function (err, books) { 
                    console.log("isbn " + term);
                    if (err) { res.status(500).json(err); }
                    else { res.status(200).json(books); }
                });
                break;
            }
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
            if (RegExp(/^[0-9]+$/).test(term)) {
                UsedBook.find({ isbn: term }, function (err, books) { 
                    console.log("isbn " + term);
                    if (err) { res.status(500).json(err); }
                    else { res.status(200).json(books); } 
                });
                break;
            }
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
