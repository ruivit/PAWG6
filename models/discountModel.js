var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DiscountSchema = new Schema({
  perSoldBooks: { type: Number, required: true, default: 0.05 },

  perTotalSold: { type: Number, required: true, default: 0 },

  perTotalBuys: { type: Number, required: true, default: 0 },

  perInfantil: { type: Number, required: true, default: 0 },
  perJuvenil: { type: Number, required: true, default: 0 },
  perAdulto: { type: Number, required: true, default: 0 },
  perSenior: { type: Number, required: true, default: 0 },

}, { collection: 'Discount' });

// Export model.
module.exports = mongoose.model('Discount', DiscountSchema);
