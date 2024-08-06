var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/tools')

const Prompt = require('../models/prompts');


router.post("/", async (req, res) => {
    if (!checkBody(req.body, ['genre', 'prompt', 'isPublic', 'email', "username"])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }
    const Prompt = new Prompt({
        genre: req.body.genre,
        prompt: req.body.prompt,
        audio: req.body.audio,
        rating: req.body.rating,
        isPublic: req.body.isPublic,
        username: req.body.username,
        email: req.body.email
    })
    const savedPrompt = await Prompt.save()
    console.log(savedPrompt)
    res.json({ result: true, prompt: savedPrompt })
})

module.exports = router;