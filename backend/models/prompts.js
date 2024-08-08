const mongoose = require('mongoose');

const promptsSchema = mongoose.Schema({
    prompt: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
    keywords: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'keywords' }], required: false },
    titre: { type: String, required: true },
    genre: { type: String, required: true },
    messages: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages' }], required: false },
    theme: { type: String, required: false },
    audio: { type: String, required: false },
    nbLikes: { type: Number, required: false },
    rating: { type: Number, required: false },
    isPublic: { type: Boolean, required: true },
    nbSignalement: { type: Number, required: false },
    createdAt: { type: Date, required: true }
});

const Prompt = mongoose.model('prompts', promptsSchema);

module.exports = Prompt;