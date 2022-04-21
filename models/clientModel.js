var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  phone: { type: Number, required: true },
  points: { type: Number, required: false, default: 10 },
  birthDate: { type: Date, default: Date.now },
  ageType: { type: String, required: true },
}, {
  collection: 'clients'
});

// Export model.
module.exports = mongoose.model('Client', ClientSchema);
