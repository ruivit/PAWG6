var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  author:{ type: String, required: true },
  genre:{ type: String, required: true },
  editor:{ type: String, required: true },
  resume: { type: String, required: true },
  avaliation: { type: Number, required: false, default: 0 },
  isbn: { type: Number, required: true },
  dateAdded: { type: Date, required: false, default: Date.now },
  condition: { type: String, required: true },
  provider: { type: Schema.Types.ObjectId, required: true },
  stock: { type: Number, required: false, defeault: 0 },
  sellPrice: { type: Number, required: true },
  buyPrice: { type: Number, required: true},
  forSale: { type: Boolean, required: true, default: true },
}, { collection: 'Books' });

// Export model.
module.exports = mongoose.model('Book', BookSchema);
