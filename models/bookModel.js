var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  autor:{ type: String, required: true },
  isbn: { type: Number, required: true },
  genero:{ type: String, required: true },
  editor:{ type: String, required: true },
  stock: { type: Number, required: true },
  dataAdd: { type: Date, default: Date.now },
  condition: { type: Number, required: true },
  provider: { type: Number, required: true },
  resume: { type: Number, required: true },
  avaliation: { type: Number, required: true },
  price: { type: Number, required: true },
  
}, {
  collection: 'books'
});

// Export model.
module.exports = mongoose.model('Book', BookSchema);
