var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  isbn: { type: Number, required: true },
  added: { type: Date, default: Date.now },
}, {
  collection: 'books'
});

// Export model.
module.exports = mongoose.model('Book', BookSchema);
