// ----------------------- Models ------------------------------
var Client = require('../models/clientModel');
var Book = require('../models/bookModel');
var UsedBook = require('../models/usedBookModel');
var Sale = require('../models/saleModel');
var Points = require('../models/pointsModel');
var nodemailer = require('nodemailer');




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
    Client.findOne({ username: "ruiv" }, function (err, client) {
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
    // Make the sale
    var sale = new Sale({
        clientUsername: "ruiv",
        books: req.body.books,
        quantity: req.body.quantity,
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
        }
    });


    // Update the client points
    Client.findOneAndUpdate(
        { username: "client1" },
        { $inc: { points: req.body.gainedPoints } }
        , function (err, client) {
            if (err) {
                res.render('error/error', { message: "Error updating client points", error: err });
            }
        });

    // Update the books with the quantity
    for (var book = 0; book < req.body.books.length; book++) {
        for (var qnt = 0; qnt < req.body.quantity.length; qnt++) {
            Book.findOneAndUpdate({ _id: req.body.books[book]._id }, 
                { $inc: { stock: -req.body.quantity[qnt] } }
                , function (err, book) {
                    if (err) {
                        res.render('error/error', { message: "Error updating book quantity", error: err });
                    }
                });
            }
        }

    res.status(200).json({ message: "Sale made" });
}; // Make a sale



exports.client_search_get = function (req, res) {
    var term = req.query.term;
    Book.find({
        $or: [
            { title: { $regex: term, $options: 'i' } }
        ]
    }, function (err, books) {
        if (err) {
            res.render('error/error', { error: err });
        } else {
            res.status(200).json(books);
        }
    }
    );
}; // Search for books

exports.client_sell_usedbook_post = function (req, res) {
    console.log(req.file);
    console.log(req.files)
    var usedBook = new UsedBook({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        editor: req.body.editor,
        resume: req.body.resume,
        isbn: req.body.isbn,
        provider: 'cliente1',
        sellPrice: req.body.sellPrice
    });
    console.log(req.body);

    usedBook.save(function (err) {
        if (err) {
            res.render('error/error', { message: "Error creating used book", error: err });
        }
    });

     // save the cover
     if (req.file) {
        fs.writeFileSync("./public/images/books/ola" + ".jpg", req.file.buffer);
    }

        //sendMailClient(usedBook);
        //sendMail(usedBook);
        
        res.status(200).json( { message: "Used book created successfully" } );

        

}; // Sell a used book

