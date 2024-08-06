const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    google_id: { type: Number, required: true, default: null, unique: true, sparse: true /* Permet les valeurs nulles*/ },
    password: {
        type: String,
        required: function () { return !this.googleId; /* Le mot de passe est requis uniquement si googleId n'est pas défini */ },
        default: null
    },
    token: { type: String, required: true },
    prompts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prompts' }], required: false, default: [] },
    likedprompts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'likedprompts' }], required: false, default: [] },
    firstname: { type: String, required: true },
    photo: { type: String, required: false },
});

const User = mongoose.model('users', userSchema);

module.exports = User;