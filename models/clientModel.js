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
  birthDate: { type: Date, required: true, default: Date.now },
  ageType: { type: Number, required: true },
}, {
  collection: 'clients'
});
  
// Export model.
module.exports = mongoose.model('Client', ClientSchema);
