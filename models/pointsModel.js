var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PointsSchema = new Schema({
  pointsPerPrice : { type: Number, required: true },
}, { collection: 'Points' });

// Export model.
module.exports = mongoose.model('Points', PointsSchema);
