var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/tools')

const Project = require('../models/projects');
const User = require('../models/users')
const Keyword = require("../models/keywords")


router.post("/add", async (req, res) => {

    if (!checkBody(req.body, ['genre', 'prompt', 'email', "username", "rating", "title"])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }
    // Authentification de l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
    !foundUser && res.json({ result: false, error: 'Access denied' });

    //Enregistrer en base de donnée le Prompt, sans les espaces à la fin et au début, et sans la virgule à la fin.
    const promptToSplit = req.body.prompt.trim()
    const promptToSplitWithoutComa = promptToSplit[promptToSplit.length - 1] === "," ? promptToSplit.slice(0, -1) : promptToSplit
    const newProject = new Project({
        genre: req.body.genre,
        prompt: promptToSplitWithoutComa,
        audio: req.body.audio,
        rating: req.body.rating,
        isPublic: req.body.isPublic,
        username: req.body.username,
        email: req.body.email,
        userId: foundUser._id,
        title: req.body.title
    })
    const savedProject = await newProject.save()

    // Mettre à jour le tableau de clé étrangère "prompts" avec l'id du prompt et le tableau genre si le genre ni est pas déjà 
    if (foundUser.genres.some(e => e === req.body.genre)) {
        await User.updateOne({ email: req.body.email },
            { $push: { prompts: savedProject._id } }
        )
    } else {
        await User.updateOne({ email: req.body.email },
            {
                $push: { prompts: savedProject._id },
                $push: { genres: req.body.genre }
            },
        )
    }

    // Récupérer les keywords de manière formatée 

    const splittedKeywords = promptToSplitWithoutComa.split(',')
    const keywords = []
    for (const wordToFormat of splittedKeywords) {
        const wordToTrim = wordToFormat.trim()
        keywords.push(wordToTrim.charAt(0).toUpperCase() + wordToTrim.slice(1))
    }

    // Créer un tableau des id présents en clé étrangère pour le keyword s'il n'existe pas. S'il existe, on rajoute les keywords dans ses related_keywords.
    const existingKeywordIds = []
    const newKeywordIds = []
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
                prompts: savedProject._id,
                genre: req.body.genre
            })
            const savedKeyword = await newKeyword.save()

            newKeywordIds.push(savedKeyword._id)
        }
    }
    const promptKeywordsIds = [...newKeywordIds, ...existingKeywordIds]
    await Project.updateOne({ _id: savedProject._id },
        { keywords: promptKeywordsIds }
    )

    // Si l'id n'est pas présent dans les related_Keywords, on le rajoute

    if (newKeywordIds.length) {
        for (const id of newKeywordIds) {
            const foundKeywordById = await Keyword.findById(id)
            const filteredKeywordIds = keywords.filter(e => e === foundKeywordById.keyword).length > 1 ? newKeywordIds : newKeywordIds.filter(e => e !== id)
            const allKeywordsIdsOfThisGenre = [...filteredKeywordIds, ...existingKeywordIds]
            await Keyword.updateOne({ _id: id, genre: req.body.genre }, {
                $push: { related_keywords: allKeywordsIdsOfThisGenre }
            })
        }

    }

    // Si il y a déjà des related_keywords, mets à jour la liste en ajoutant ceux qui n'y sont pas déjà.
    if (existingKeywordIds.length) {
        for (const id of existingKeywordIds) {
            const foundKeywordById = await Keyword.findById(id)
            const populatedKeyword = await Keyword.findById(id).populate('prompts')
            const checkIntoNewIdsIfTheyArentPresent = []
            for (let i = 0; i < newKeywordIds.length; i++) {
                if (!populatedKeyword.related_keywords.some(e => String(e) === String(newKeywordIds[i]))) {
                    checkIntoNewIdsIfTheyArentPresent.push(newKeywordIds[i])
                }
            }
            const updateRelatedKeywordId = [...populatedKeyword.related_keywords, ...checkIntoNewIdsIfTheyArentPresent]

            let resultAverageRating = 0
            const promptKeywordsCount = (populatedKeyword.prompts).length
            for (const prompt of populatedKeyword.prompts) {
                resultAverageRating += prompt.rating
            }
            if (!foundKeywordById.prompts.some(e => String(e) === String(savedProject._id))) {
                await Keyword.updateOne({ _id: id }, {
                    $inc: { frequency: 1 },
                    related_keywords: updateRelatedKeywordId,
                    $push: { prompts: savedProject._id },
                    average_rating: resultAverageRating / promptKeywordsCount
                })
            } else {
                await Keyword.updateOne({ _id: id }, {
                    $inc: { frequency: 1 },
                    related_keywords: updateRelatedKeywordId,
                    average_rating: resultAverageRating / promptKeywordsCount
                })
            }
        }
    }

    res.json({ result: true, prompt: savedProject })
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
    const actualPrompt = await Project.findOne({ userId: foundUser._id, genre: req.body.genre });
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









router.post("/searchMyGenres", async (req, res) => {

    // Vérification des éléments requis pour la route
    if (!checkBody(req.body, ['email', 'token'])) {
        res.json({ result: false, message: 'Champs manquants ou vides' });
        return;
    }
    // Authentification de l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
    if (!foundUser) { return res.json({ result: false, error: 'Access denied' }) };

    // Formattage du champ de recherche
    let formattedSearch;
    let splitSearch;
    if (req.body.search) {
        splitSearch = req.body.search.trim();
        splitSearch = splitSearch[splitSearch.length - 1] === "," ? splitSearch.slice(0, -1) : splitSearch
        formattedSearch = splitSearch[0] === "," ? splitSearch.slice(1) : splitSearch
    }

    // Etablissement de la pipeline
    let pipeline = [
        {
            $match: {
                userId: foundUser._id,
                prompt: new RegExp(formattedSearch, 'i')
            }
        },
        {
            $limit: 20
        }
    ];

    // Recherche grâce à la pipeline
    const searchResults = await Project.aggregate(pipeline);

    // Si la recherche est vide, afficher tous les résultats
    if (req.body.search = '') {
        searchResults = Project.find({ userId: foundUser._id })
    }

    res.json({ result: true, searchResults })
})



router.post("/searchCommunityGenres", async (req, res) => {

    // Vérification des éléments requis pour la route
    if (!checkBody(req.body, ['email', 'token'])) {
        res.json({ result: false, message: 'Champs manquants ou vides' });
        return;
    }
    // Authentification de l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
    if (!foundUser) { return res.json({ result: false, error: 'Access denied' }) };

    // Formattage du champ de recherche
    let formattedSearch;
    let splitSearch;
    if (req.body.search) {
        splitSearch = req.body.search.trim();
        splitSearch = splitSearch[splitSearch.length - 1] === "," ? splitSearch.slice(0, -1) : splitSearch
        formattedSearch = splitSearch[0] === "," ? splitSearch.slice(1) : splitSearch
    }

    // Etablissement de la pipeline
    let pipeline = [
        {
            $match: {
                $or: [
                    { genre: { $regex: new RegExp(req.body.search, 'i') } },
                    { prompt: { $regex: new RegExp(req.body.search, 'i') } }
                ]
            }
        },
        {
            $limit: 20
        }
    ];

    // Recherche grâce à la pipeline
    const searchResults = await Project.aggregate(pipeline);

    // Si la recherche est vide, afficher tous les résultats
    if (req.body.search = '') {
        searchResults = Project.find({ isPublic: true })
    }

    res.json({ result: true, searchResults })
})











router.post('/searchGenre', async (req, res) => {

    if (!checkBody(req.body, ['genre'])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }

    const fetchAllPrompts = await Project.find({ genre: { $regex: new RegExp(req.body.genre.toLowerCase(), "i") } })
    if (fetchAllPrompts.length) {
        const prompts = []
        for (const populateUserId of fetchAllPrompts) {
            const userIdPopulatedInPrompt = await populateUserId.populate('userId')
            userIdPopulatedInPrompt.isPublic && prompts.push(userIdPopulatedInPrompt)
        }
        if (prompts.length) {
            res.json({ result: true, promptsList: prompts })
        } else {
            res.json({ result: false, error: 'Genre existant mais non public' })
        }
    } else {
        res.json({ result: false, error: 'Genre non existant' })
    }
})

router.post('/searchTitle', async (req, res) => {

    if (!checkBody(req.body, ['title'])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }

    const fetchAllPrompts = await Project.find({ title: { $regex: new RegExp(req.body.title.toLowerCase(), "i") } })
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