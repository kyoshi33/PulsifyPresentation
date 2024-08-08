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
        createdAt: new Date(),
        title: req.body.title
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
        const foundExistingKeyword = await Keyword.findOne({ keyword: word, userId: foundUser._id, genre: req.body.genre })
        if (foundExistingKeyword) {
            existingKeywordIds.push(foundExistingKeyword._id)
        } else {

            const newKeyword = new Keyword({
                userId: foundUser._id,
                keyword: word,
                frequency: 1,
                average_rating: req.body.rating,
                prompts: savedPrompt._id,
                genre: req.body.genre
            })
            const savedKeyword = await newKeyword.save()
            console.log("coucou")
            keywordIds.push(savedKeyword._id)
        }
    }
    const promptKeywordsIds = [...keywordIds, ...existingKeywordIds]
    await Prompt.updateOne({ _id: savedPrompt._id },
        { keywords: promptKeywordsIds }
    )

    // Si l'id n'est pas présent dans les related_Keywords, on le rajoute

    if (keywordIds.length) {
        for (const id of keywordIds) {
            const foundKeywordById = await Keyword.findById(id)
            const filteredKeywordIds = keywords.filter(e => e === foundKeywordById.keyword).length > 1 ? keywordIds : keywordIds.filter(e => e !== id)
            // console.log(keywordIds)
            const allKeywordsIdsOfThisGenre = [...filteredKeywordIds, ...existingKeywordIds]
            await Keyword.updateOne({ _id: id, genre: req.body.genre }, {
                $push: { related_keywords: allKeywordsIdsOfThisGenre }
            })
        }

    }

    // Si il y a déjà des related_keywords, mets à jour la liste en ajoutant ceux qui n'y sont pas déjà.
    if (existingKeywordIds.length) {
        for (const id of existingKeywordIds) {
            const inexistingIds = []
            const foundKeywordById = await Keyword.findById(id)
            const populatedKeyword = await Keyword.findById(id).populate('prompts')
            const filteredKeywordIds = keywords.filter(e => e === populatedKeyword.keyword).length > 1 ? inexistingIds : inexistingIds.filter(e => e !== id)
            const updateRelatedKeywordId = [...filteredKeywordIds, ...keywordIds]
            console.log("a push", updateRelatedKeywordId)
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
                    $push: { related_keywords: updateRelatedKeywordId },
                    $push: { prompts: savedPrompt._id },
                    average_rating: resultAverageRating / promptKeywordsCount
                })
            } else {
                await Keyword.updateOne({ _id: id }, {
                    $inc: { frequency: 1 },
                    $push: { related_keywords: updateRelatedKeywordId },
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

    // Formattage du prompt
    const splitPrompt = req.body.partialPrompt.trim();
    let formattedPrompt = splitPrompt[splitPrompt.length - 1] === "," ? splitPrompt.slice(0, -1) : splitPrompt
    formattedPrompt = splitPrompt[0] === "," ? splitPrompt.slice(1) : splitPrompt
    formattedPrompt = splitPrompt[splitPrompt.length - 1] === "]" ? splitPrompt.slice(0, -1) : splitPrompt
    formattedPrompt = splitPrompt[0] === "[" ? splitPrompt.slice(1) : splitPrompt

    //Initialisation des coefficients de calcul du score
    const weight_rating = 0.7;
    const weight_frequency = 0.3;

    // Récupération de l'id du prompt
    const actualPrompt = await Prompt.findOne({ userId: foundUser._id, genre: req.body.genre });
    const actualPromptId = actualPrompt._id;

    // Création de la pipeline Mongoose
    let pipeline = [
        {
            $match: {
                userId: foundUser._id,
                // genre: req.body.genre,
                keyword: new RegExp(req.body.formattedPrompt, 'i')
            }
        },
        {
            $addFields: {
                score_global: {
                    $add: [
                        { $multiply: [weight_rating, "$average_rating"] },
                        { $multiply: [weight_frequency, { $log10: "$frequency" }] }
                    ]
                }
            }
        },
        {
            $sort: {
                score_global: -1
            }
        },
        {
            $limit: 10
        }
    ];

    suggestionsList = await Keyword.aggregate(pipeline);

    // Réponse avec la liste de suggestions
    res.json({ result: true, suggestionsList })
})














































router.post('/search', async (req, res) => {

    if (!checkBody(req.body, ['genre'])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }

    const fetchAllPrompts = await Prompt.find({ genre: { $regex: new RegExp(req.body.genre.toLowerCase(), "i") } })
    if (fetchAllPrompts.length) {
        const prompts = []
        for (const populateUserId of fetchAllPrompts) {
            const userIdPopulatedInPrompt = await populateUserId.populate('userId')
            userIdPopulatedInPrompt.isPublic && prompts.push(userIdPopulatedInPrompt)
        }
        if (prompts.length) {
            res.json({ result: true, promptsList: prompts })
        } else {
            res.json({ result: false, error: 'Projet existant mais non public' })
        }
    } else {
        res.json({ result: false, error: 'Projet non existant' })
    }
})

//Récupérer la liste des projets enregistrés. 
// router.get('/myproject', async (req, res) => {


// })


module.exports = router;