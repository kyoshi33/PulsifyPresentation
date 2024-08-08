var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/tools')

const Prompt = require('../models/prompts');
const User = require('../models/users')
const Keyword = require("../models/keywords")


router.post("/add", async (req, res) => {

    if (!checkBody(req.body, ['genre', 'prompts', 'email', "username", "rating"])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }


    //Enregistrer en base de donnée le Prompt, sans les espaces à la fin et au début, et sans la virgule à la fin.
    const promptsToSplit = req.body.prompts.trim()
    const promptsToSplitWithoutComa = promptsToSplit[promptsToSplit.length - 1] === "," ? promptsToSplit.slice(0, -1) : promptsToSplit
    const foundUser = await User.findOne({ email: req.body.email })
    const newPrompt = new Prompt({
        genre: req.body.genre,
        prompts: promptsToSplitWithoutComa,
        audio: req.body.audio,
        rating: req.body.rating,
        isPublic: req.body.isPublic,
        username: req.body.username,
        email: req.body.email,
        userId: foundUser._id,
        date: new Date(),

    })
    const savedPrompt = await newPrompt.save()

    // Mettre à jour le tableau de clé étrangère "prompts" avec l'id du prompt.
    await User.updateOne({ email: req.body.email },
        { $push: { prompts: savedPrompt._id } }
    )

    // Récupérer les keywords de manière formatée 

    const splittedKeywords = promptsToSplitWithoutComa.split(',')
    const keywords = []
    for (const wordToFormat of splittedKeywords) {
        const wordToTrim = wordToFormat.trim()
        keywords.push(wordToTrim.charAt(0).toUpperCase() + wordToTrim.slice(1))
    }

    // Créer un tableau des id présents en clé étrangère pour le keyword s'il n'existe pas. S'il existe, on rajoute les keywords dans ses related_keywords.
    const existingKeywordIds = []
    const idOfKeywordTab = []
    for (const word of keywords) {
        const foundExistingKeyword = await Keyword.findOne({ keyword: word, userId: foundUser._id })
        if (foundExistingKeyword) {
            existingKeywordIds.push(foundExistingKeyword._id)
        } else {

            const newKeyword = new Keyword({
                userId: foundUser._id,
                keyword: word,
                frequency: 1,
                average_rating: req.body.rating,
                prompts: savedPrompt._id
            })
            const savedKeyword = await newKeyword.save()
            idOfKeywordTab.push(savedKeyword._id)
        }
    }

    // Si l'id n'est pas présent dans les related_Keywords, on le rajoute
    if (idOfKeywordTab.length) {
        console.log(idOfKeywordTab)
        for (const id of idOfKeywordTab) {
            const foundKeywordById = await Keyword.findById(id)
            const filteredIdOfKeywordTab = keywords.filter(e => e === foundKeywordById.keyword).length > 0 ? idOfKeywordTab : idOfKeywordTab.filter(e => e !== id)
            await Keyword.updateOne({ _id: id }, {
                $push: { related_keywords: filteredIdOfKeywordTab }
            })
        }
    }

    // Si il y a déjà des related_keywords, mets à jour la liste en ajoutant ceux qui n'y sont pas déjà.
    if (existingKeywordIds.length) {
        for (const id of existingKeywordIds) {
            const idsInexisting = []
            const foundExistingKeywordInRelatedKeyword = await Keyword.findById(id)

            const filteredIdOfKeywordTab = keywords.filter(e => e === foundExistingKeywordInRelatedKeyword.keyword).length > 0 ? idsInexisting : idsInexisting.filter(e => e !== id)
            for (let i = 0; i < existingKeywordIds.length; i++) {
                if (!foundExistingKeywordInRelatedKeyword.related_keywords.some(e => String(e) === String(existingKeywordIds[i]))) {
                    idsInexisting.push(existingKeywordIds[i])
                }
            }
            await Keyword.updateOne({ _id: id }, {
                $inc: { frequency: 1 },
                $push: { related_keywords: filteredIdOfKeywordTab }
            })
        }
    }
    res.json({ result: true, prompt: savedPrompt })
})

module.exports = router;