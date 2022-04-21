var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  author:{ type: String, required: true },
  genre:{ type: String, required: true },
  editor:{ type: String, required: true },
  resume: { type: String, required: true },
  avaliation: { type: Number, required: true },
  isbn: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  condition: { type: String, required: true },
  provider: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  
}, {
  collection: 'books'
});

// Export model.
module.exports = mongoose.model('Book', BookSchema);
