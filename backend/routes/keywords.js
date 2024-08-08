var express = require('express');
var router = express.Router();
require('../models/connection');
const Keyword = require('../models/keywords');
const { checkBody } = require('../modules/tools')

router.post('/search', async (req, res) => {

    if (!checkBody(req.body, ['keyword'])) {
        res.json({ result: false, error: 'Champs vides ou manquants' });
        return;
    }

    const fetchAllKeywords = await Keyword.find({ keyword: req.body.keyword })

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

module.exports = router;