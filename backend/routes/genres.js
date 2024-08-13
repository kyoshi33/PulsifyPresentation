var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/tools')
const Project = require('../models/projects');
const User = require('../models/users')
const Keyword = require("../models/keywords")


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
                $and: [{ userId: foundUser._id },
                ],
                $or: [
                    { genre: { $regex: new RegExp(formattedSearch, 'i') } },
                    { prompt: { $regex: new RegExp(formattedSearch, 'i') } },
                    { userId: { $regex: new RegExp(formattedSearch, 'i') } }
                ],
            }
        },
        {
            $limit: 20
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userId'
            }
        },
        {
            $unwind: '$userId'
        }
    ];

    // Recherche grâce à la pipeline
    let searchResults = await Project.aggregate(pipeline);

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
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $match: {
                $or: [
                    { 'userDetails.username': { $regex: new RegExp(req.body.search, 'i') } },
                    { genre: { $regex: new RegExp(formattedSearch, 'i') } },
                    { prompt: { $regex: new RegExp(formattedSearch, 'i') } }
                ]
            }
        },
        {
            $limit: 20
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userId'
            }
        },
        {
            $unwind: '$userId'
        }
    ];

    // Recherche grâce à la pipeline
    let searchResults = await Project.aggregate(pipeline);

    // Si la recherche est vide, afficher tous les résultats
    if (req.body.search = '') {
        searchResults = await Project.find({ isPublic: true })
    }



    res.json({ result: true, searchResults })
})




router.post('/searchGenre', async (req, res) => {

    // Authentification de l'utilisateur
    if (!checkBody(req.body, ['genre', 'email', 'token'])) {
        res.json({ result: false });
        return;
    }

    // Authentification de l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
    if (!foundUser) { return res.json({ result: false, error: 'Access denied' }) };

    // Recherche par genre en ignorant la casse
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
});


router.post('/allGenres', async (req, res) => {

    // Vérification des éléments requis pour la route
    if (!checkBody(req.body, ['token', 'email'])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }
    // Authentification de l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
    if (!foundUser) { return res.json({ result: false, error: 'Access denied' }) };

    // Récupération de tous les genres
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