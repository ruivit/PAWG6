var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    category: {type: String, required: true},
});

// Virtual for this Employee instance URL.
// I dont know wtf is this
EmployeeSchema
.virtual('url')
.get(function () {
  return '/admin/employee/'+this._id;
});

// Export model.
module.exports = mongoose.model('Employee', EmployeeSchema);
