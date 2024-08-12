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
    await User.updateOne({ email: req.body.email },
        { $push: { prompts: savedProject._id } })
    if (!foundUser.genres.some(e => e === req.body.genre)) {
        await User.updateOne({ email: req.body.email },
            { $push: { genres: req.body.genre } }
        )
    }

    // Récupérer les keywords de manière formatée 
    const splittedKeywords = promptToSplitWithoutComa.split(',')
    const keywords = []
    for (const wordToFormat of splittedKeywords) {
        const trimmedWords = wordToFormat.trim()
        keywords.push(trimmedWords.charAt(0).toUpperCase() + trimmedWords.slice(1))
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

router.delete("/prompt", (req, res) => {
    if (!checkBody(req.body, ['id', 'email'])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }
    const { id } = req.body;
    Project.deleteOne({ _id: id })
        .then(deletedDoc => {
            if (deletedDoc.deletedCount > 0) {
                res.json({ result: true })
            } else {
                res.json({ resutl: false })
            }
        })
});




// Route pour incrémenter nbSignalements
router.post('/signalement', async (req, res) => {
    try {
        const projectId = req.body.id;
        const project = await Project.findByIdAndUpdate(
            projectId,
            { $inc: { nbSignalements: 1 } },  // Incrémentation de nbSignalements de 1
        ); console.log(project)
        if (!project) {
            return res.json({ result: false });
        }
        res.json({ result: true })
    } catch (error) {
        res.json({ result: error });
    }
});




router.post("/projectById", async (req, res) => {
    console.log(req.body)
    console.log(req.body.id)
    const projectId = req.body.id;
    const project = await Project.findById({ _id: projectId }).populate('userId').populate('keywords')
    console.log('project 1 :', project)

    if (!project) {
        return res.json({ result: false, message: "project not found" })
    } else {
        // console.log('project :', project)
        return res.json({ result: true, info: project })

    }
});

router.get('/allGenres', async (req, res) => {
    const foundAllProject = await Project.find()
    if (foundAllProject.length) {
        allGenres = []
        for (const project of foundAllProject) {
            if (!allGenres.some(e => e === project.genre) && project.isPublic)
                allGenres.push(project.genre)
        }
        res.json({ result: true, allGenres: allGenres })
    } else {
        res.json({ result: false })
    }
})

module.exports = router;