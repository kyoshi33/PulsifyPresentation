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


module.exports = router;