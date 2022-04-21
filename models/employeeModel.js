var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    category: { type: String, required: true },
    admin: { type: Boolean, required: false, default: false },
});

// Export model.
module.exports = mongoose.model('Employee', EmployeeSchema);
