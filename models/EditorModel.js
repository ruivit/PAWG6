var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EditorSchema = new Schema({
  name: { type: String, required: true }
});

// Export model.
module.exports = mongoose.model('Editor', AuthorSchema);
