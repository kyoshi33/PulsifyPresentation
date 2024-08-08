const mongoose = require('mongoose');

const signalementsSchema = mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
  text: String,
  prompts: { type: mongoose.Schema.Types.ObjectId, ref: 'prompts', required: false },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'messages', required: false },
  creationDate: Date,


});

const Signalement = mongoose.model('signalements', signalementsSchema);

module.exports = Signalement;