var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  name: { type: String, required: true }
});

// Export model.
module.exports = mongoose.model('Author', AuthorSchema);
