var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/tools')

const Prompt = require('../models/prompts');
const User = require('../models/users')


router.post("/", async (req, res) => {

    if (!checkBody(req.body, ['genre', 'prompts', 'isPublic', 'email', "username", "rating"])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }

    const searchUser = await User.findOne({ email: req.body.email })

    const newPrompt = new Prompt({
        genre: req.body.genre,
        prompts: req.body.prompts,
        audio: req.body.audio,
        rating: req.body.rating,
        isPublic: req.body.isPublic,
        username: req.body.username,
        email: req.body.email,
        userId: searchUser._id,
        date: new Date()
    })
    const savedPrompt = await newPrompt.save()
    console.log(savedPrompt)


    await User.updateOne({ email: req.body.email },
        { $push: { prompts: savedPrompt._id } }
    )

    res.json({ result: true, prompt: savedPrompt })
})

module.exports = router;