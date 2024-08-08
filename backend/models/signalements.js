const mongoose = require('mongoose');

const signalementsSchema = mongoose.Schema({






});

const Signalement = mongoose.model('signalements', signalementsSchema);

module.exports = Signalement;