var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
  isbn: { type: String, required: true },
}, {
  collection: 'books'
});

// Export model.
module.exports = mongoose.model('Book', BookSchema);
