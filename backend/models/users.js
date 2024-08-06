const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    google_id: { type: Number, required: true, default: null },
    password: { type: String, required: true, default: null },
    token: { type: String, required: true },
    prompts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prompts' }], required: false, default: [] },
    likedprompts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'likedprompts' }], required: false, default: [] },
    firstname: { type: String, required: true },
    photo: { type: String, required: false },
});

const User = mongoose.model('users', userSchema);

module.exports = User;