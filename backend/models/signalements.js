const mongoose = require('mongoose');

const signalementsSchema = mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  text: { type: String, required: true },
  prompt: { type: mongoose.Schema.Types.ObjectId, ref: 'prompts', required: false },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'messages', required: false },
  createdAt: { type: Date, required: true },


});

const Signalement = mongoose.model('signalements', signalementsSchema);

module.exports = Signalement;