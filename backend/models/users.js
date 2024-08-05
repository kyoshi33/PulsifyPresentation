const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    prompts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prompts' }], required: false, default: [] },
    likedprompts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'likedprompts' }], required: false, default: [] },
    firstname: { type: String, required: true },
});

const User = mongoose.model('users', userSchema);

module.exports = User;