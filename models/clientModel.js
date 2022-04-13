var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
});

// Virtual for this Client instance URL.
// I dont know wtf is this
ClientSchema
.virtual('url')
.get(function () {
  return '/admin/client/'+this._id;
});

// Export model.
module.exports = mongoose.model('Client', EmployeeSchema);
