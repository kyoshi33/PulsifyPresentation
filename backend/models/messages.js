const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
  text: String,
  prompts: { type: mongoose.Schema.Types.ObjectId, ref: 'prompts', required: false },
  creationDate: Date,
  nbSignalements: Number,


});

const Message = mongoose.model('messages', messagesSchema);

module.exports = Message;