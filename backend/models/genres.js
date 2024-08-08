const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    userId: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], required: true },
    prompts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prompts' }] },
});

const Genre = mongoose.model('keywords', genreSchema);

module.exports = Genre;