var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  phone: { type: Number, required: false },
  points: { type: Number, required: false, default: 10 },
  birthDate: { type: Date, required: true },
  ageType: { type: String, required: true },

  totalBuys: { type: Number, required: false, default: 0 },
  // Quando se compra um livro, +1

  soldBooks: { type: Number, required: false, default: 0 },
  // Quantidade de livros vendidos pelo cliente
  totalSold: { type: Number, required: false, default: 0 },
  // Total de dinheiro gasto pelo cliente
}, { collection: 'Clients' });
  
// Export model.
module.exports = mongoose.model('Client', ClientSchema);
