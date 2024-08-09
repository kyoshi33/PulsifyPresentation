const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  text: { type: String, required: true },
  prompt: { type: mongoose.Schema.Types.ObjectId, ref: 'prompts', required: true },
  createdAt: { type: Date, default: new Date() },
  nbSignalements: { type: Number, required: true, default: 0 },


});

const Message = mongoose.model('messages', messagesSchema);

module.exports = Message;