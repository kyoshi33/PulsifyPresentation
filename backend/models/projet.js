const mongoose = require('mongoose');

const projetSchema = mongoose.Schema({
    prompt: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
    keywords: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'keywords' }], required: false },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    messages: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages' }], required: false },
    theme: { type: String, required: false },
    audio: { type: String, required: false },
    nbLikes: { type: Number, required: false },
    rating: { type: Number, required: false },
    isPublic: { type: Boolean, required: true },
    nbSignalements: { type: Number, required: false },
    createdAt: { type: Date, default: new Date() },
    ia: { type: String, required: false, default: "Suno" }
});

const Projet = mongoose.model('projet', projetSchema);

module.exports = Projet;