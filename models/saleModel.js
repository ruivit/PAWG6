var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SaleSchema = new Schema({
  client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
  livros: [{ type: Schema.Types.ObjectId, ref: 'Livros' }],
  total: { type: Number, default: 0 },
  gainedPoints: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  online: { type: Boolean, default: true },
  employee_id: { type: Schema.Types.ObjectId, ref: 'Employee' },
  shipping: { type: Number, default: 0 }
});

// Export model.
module.exports = mongoose.model('Sale', SaleSchema);
