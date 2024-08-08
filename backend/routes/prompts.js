var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/tools')

const Prompt = require('../models/prompts');
const User = require('../models/users')
const Keyword = require("../models/keywords")


router.post("/add", async (req, res) => {

    if (!checkBody(req.body, ['genre', 'prompt', 'email', "username", "rating"])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }
    // Authentification de l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
    !foundUser && res.json({ result: false, error: 'Access denied' });

    //Enregistrer en base de donnée le Prompt, sans les espaces à la fin et au début, et sans la virgule à la fin.
    const promptToSplit = req.body.prompt.trim()
    const promptToSplitWithoutComa = promptToSplit[promptToSplit.length - 1] === "," ? promptToSplit.slice(0, -1) : promptToSplit
    const newPrompt = new Prompt({
        genre: req.body.genre,
        prompt: promptToSplitWithoutComa,
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

    const splittedKeywords = promptToSplitWithoutComa.split(',')
    const keywords = []
    for (const wordToFormat of splittedKeywords) {
        const wordToTrim = wordToFormat.trim()
        keywords.push(wordToTrim.charAt(0).toUpperCase() + wordToTrim.slice(1))
    }

    // Créer un tableau des id présents en clé étrangère pour le keyword s'il n'existe pas. S'il existe, on rajoute les keywords dans ses related_keywords.
    const existingKeywordIds = []
    const keywordIds = []
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
            keywordIds.push(savedKeyword._id)
        }
    }
    let promptKeywordsIds = [...keywordIds, ...existingKeywordIds]
    await Prompt.updateOne({ _id: savedPrompt._id },
        { keywords: promptKeywordsIds }
    )

    // Si l'id n'est pas présent dans les related_Keywords, on le rajoute
    if (keywordIds.length) {
        for (const id of keywordIds) {
            const foundKeywordById = await Keyword.findById(id)
            const filteredKeywordIds = keywords.filter(e => e === foundKeywordById.keyword).length > 0 ? keywordIds : keywordIds.filter(e => e !== id)
            await Keyword.updateOne({ _id: id }, {
                $push: { related_keywords: filteredKeywordIds }
            })
        }

    }

    // Si il y a déjà des related_keywords, mets à jour la liste en ajoutant ceux qui n'y sont pas déjà.
    if (existingKeywordIds.length) {
        for (const id of existingKeywordIds) {
            const inexistingIds = []
            const foundKeywordById = await Keyword.findById(id)
            const populatedKeyword = await Keyword.findById(id).populate('prompts')
            const filteredKeywordIds = keywords.filter(e => e === populatedKeyword.keyword).length > 0 ? inexistingIds : inexistingIds.filter(e => e !== id)
            for (let i = 0; i < existingKeywordIds.length; i++) {
                if (!populatedKeyword.related_keywords.some(e => String(e) === String(existingKeywordIds[i]))) {
                    inexistingIds.push(existingKeywordIds[i])
                }
            }
            let resultAverageRating = 0
            const promptKeywordsCount = (populatedKeyword.prompts).length
            for (const prompt of populatedKeyword.prompts) {
                resultAverageRating += prompt.rating
            }
            if (!foundKeywordById.prompts.some(e => String(e) === String(savedPrompt._id))) {
                await Keyword.updateOne({ _id: id }, {
                    $inc: { frequency: 1 },
                    $push: { related_keywords: filteredKeywordIds },
                    $push: { prompts: savedPrompt._id },
                    average_rating: resultAverageRating / promptKeywordsCount
                })
            } else {
                await Keyword.updateOne({ _id: id }, {
                    $inc: { frequency: 1 },
                    $push: { related_keywords: filteredKeywordIds },
                    average_rating: resultAverageRating / promptKeywordsCount
                })
            }
        }
    }

    res.json({ result: true, prompt: savedPrompt })
})







router.get("/suggestions", async (req, res) => {

    // Vérification des éléments requis pour la route
    if (!checkBody(req.body, ['token', 'genre', 'partialPrompt', 'email', "username"])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }

    // Authentification de l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
    !foundUser && res.json({ result: false, error: 'Access denied' });

    // Initialisation de la liste de suggestions
    let suggestionsList = [];

    const promptToSplit = req.body.partialPrompt.trim();



    // Réponse avec la liste de suggestions
    res.json({ result: true, suggestionsList })
})


module.exports = router;