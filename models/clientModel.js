var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
}, {
  collection: 'clients'
});

// Export model.
module.exports = mongoose.model('Client', ClientSchema);
