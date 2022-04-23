var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSellSchema = new Schema({
  title: { type: String, required: true },
  author:{ type: String, required: true },
  genre:{ type: String, required: true },
  editor:{ type: String, required: true },
  resume: { type: String, required: true },
  isbn: { type: Number, required: true },
  dateAdded: { type: Date, required: false, default: Date.now },
  price: { type: Number, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client' },
}, { collection: 'BookSell' });

// Export model.
module.exports = mongoose.model('BookSell', BookSellSchema);
