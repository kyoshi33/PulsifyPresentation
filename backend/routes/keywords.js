var express = require('express');
var router = express.Router();
require('../models/connection');
const Keyword = require('../models/keywords');
const User = require('../models/users');
const Project = require('../models/projects');
const { checkBody } = require('../modules/tools')

router.post('/search', async (req, res) => {

    if (!checkBody(req.body, ['keyword'])) {
        res.json({ result: false, error: 'Champs vides ou manquants' });
        return;
    }

    const fetchAllKeywords = await Keyword.find({ keyword: { $regex: new RegExp(req.body.keyword.toLowerCase(), "i") } })

    if (fetchAllKeywords.length) {
        const prompts = []

        for (const populatePrompts of fetchAllKeywords) {
            const populatedPrompts = await populatePrompts.populate('prompts')
            for (const userIdInPrompt of populatedPrompts.prompts) {
                const userIdInPromptPopulated = await userIdInPrompt.populate('userId')
                userIdInPromptPopulated.isPublic && prompts.push(userIdInPromptPopulated)
            }
        }
        if (prompts.length) {
            res.json({ result: true, keywordsList: prompts })
        } else {
            res.json({ result: false, error: 'Mot clé existant mais projet associé non public' })
        }
    } else {
        res.json({ result: false, error: 'Mot clé non utilisé' })
    }


});



router.get("/suggestions", async (req, res) => {

    // Vérification des éléments requis pour la route
    if (!checkBody(req.body, ['token', 'genre', 'partialPrompt', 'email'])) {
        res.json({ result: false, error: 'Champs manquants ou vides' });
        return;
    }

    // Authentification de l'utilisateur
    const foundUser = await User.findOne({ email: req.body.email, token: req.body.token })
    !foundUser && res.json({ result: false, error: 'Access denied' });

    // Initialisation de la liste de suggestions
    let suggestionsList = [];

    // Formattage du prompt
    const trimmedPartialPrompt = req.body.partialPrompt.trim();
    let formattedPrompt = trimmedPartialPrompt[trimmedPartialPrompt.length - 1] === "," ? trimmedPartialPrompt.slice(0, -1) : trimmedPartialPrompt
    formattedPrompt = trimmedPartialPrompt[0] === "," ? trimmedPartialPrompt.slice(1) : trimmedPartialPrompt
    formattedPrompt = trimmedPartialPrompt[trimmedPartialPrompt.length - 1] === "]" ? trimmedPartialPrompt.slice(0, -1) : trimmedPartialPrompt
    formattedPrompt = trimmedPartialPrompt[0] === "[" ? trimmedPartialPrompt.slice(1) : trimmedPartialPrompt


    //Initialisation des coefficients de calcul du score
    const weight_rating = 0.7;
    const weight_frequency = 0.3;

    // Création de la pipeline Mongoose
    let pipeline = [
        {
            $match: {
                userId: foundUser._id,
                genre: req.body.genre,
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











module.exports = router;