var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/tools')

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// POST créer un nouvel utilisateur.
router.post('/signup', (req, res) => {
  //Vérifier que les champs sont tous fournis
  if (!checkBody(req.body, ['firstname', 'username', 'password', 'email'])) {
    res.json({ result: false, error: 'Champs manquants ou vides' });
    return;
  }
  //Vérifier que l'e-mail a un format valide
  if (!EMAIL_REGEX.test(req.body.email)) {

    res.json({ result: false, error: 'e-mail invalide' });
    return
  }

  // Vérifier que l'utilisateur n'existe pas déjà en base de données
  User.findOne({ username: req.body.username, email: req.body.email }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      // Créer le nouvel utilisateur
      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),

      });
      newUser.save().then(newDoc => {

        res.json({ result: true, token: newDoc.token, firstname: newDoc.firstname, username: req.body.username, email: req.body.email });
      });
    } else {
      // L'utilisateur existe déjà en base de données
      res.json({ result: false, error: 'Utilisateur déjà existant' });
    }
  });
});

/* Route POST se connecter/signin     */

router.post('/signin', (req, res) => {

  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Champs manquants ou vides' });
    return;
  }
  User.findOne({ email: req.body.email })
    .then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, token: data.token, username: data.username, firstname: data.firstname, email: data.email });
      } else {
        res.json({ result: false, error: 'Champs manquants ou vides' })
      }
    })

});


router.post('/signup/google', (req, res) => {
  //Vérifier que les champs sont tous fournis
  if (!checkBody(req.body, ['firstname', 'username', "google_id", 'email', "picture"])) {
    res.json({ result: false, error: 'Champs manquants ou vides' });
    return;
  }
  //Vérifier que l'e-mail a un format valide
  if (!EMAIL_REGEX.test(req.body.email)) {

    res.json({ result: false, error: 'e-mail invalide' });
    return
  }

  // Vérifier que l'utilisateur n'existe pas déjà en base de données
  User.findOne({ google_id: req.body.google_id }).then(data => {
    if (data === null) {
      // Créer le nouvel utilisateur
      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        google_id: req.body.google_id,
        picture: req.body.picture,
        token: uid2(32),
        password: null,
      });
      newUser.save().then(newDoc => {

        res.json({ result: true, token: newDoc.token, firstname: newDoc.firstname, username: req.body.username, email: req.body.email, picture: req.body.picture });
      });
    } else {
      // L'utilisateur existe déjà en base de données
      res.json({ result: true, token: data.token, username: data.username, firstname: data.firstname, email: data.email, picture: data.picture });
    }
  });
});

//recherche par Username depuis la page Explorer
router.post('/search', async (req, res) => {
  //Vérifier que les champs sont tous fournis
  if (!checkBody(req.body, ['username'])) {
    res.json({ result: false, error: 'Champs vides ou manquants' });
    return;
  }

  const fetchAllUser = await User.find({ username: { $regex: new RegExp(req.body.username.toLowerCase(), "i") } })
  if (fetchAllUser.length) {
    const prompts = []

    for (const user of fetchAllUser) {
      const userPromptsPopulated = await user.populate('prompts')
      for (const userIdInPrompt of userPromptsPopulated.prompts) {
        const userIdInPromptPopulated = await userIdInPrompt.populate('userId')
        userIdInPromptPopulated.isPublic && prompts.push(userIdInPromptPopulated)
      }
    }

    if (prompts.length) {

      res.json({ result: true, promptsList: prompts });
    } else {
      res.json({ result: false, error: "Cet auteur n'a aucun projet" });
    }

  } else {
    res.json({ result: false, error: 'Utilisateur introuvable' })
  }

})


router.post('/projets', async (req, res) => {
  if (!checkBody(req.body, ['email', "token"])) {
    res.json({ result: false, error: 'Champs vides ou manquants' });
    return;
  }
  const foundUser = await User.findOne({ email: req.body.email }).populate('prompts')
  const foundUserLikedPromptPopulated = await foundUser.populate('likedprompts')
  let foundUserPopulated = []
  for (const id of foundUserLikedPromptPopulated.likedprompts) {
    foundUserPopulated.push(await id.populate('userId'))
  }

  res.json({ result: true, myPrompts: foundUser, likedprompts: foundUserPopulated })


})




router.post('/genres', async (req, res) => {
  if (!checkBody(req.body, ['token'])) {
    res.json({ result: false, error: 'Champs manquants.' });
    return;
  }
  const user = await User.findOne({ token: req.body.token })
  if (!user.genres) {
    res.json({ result: false, message: "Vous n'avez pas encore créé de genres" })
    return;
  }

  if (req.body.getLikedGenres) {
    const populatedUser = await user.populate('likedprompts');
    const listPrompts = [];
    for (let prompt of populatedUser.likedprompts) {
      !listPrompts.includes(prompt) && listPrompts.push(prompt.genre)
    }

    res.json({ result: true, genres: listPrompts })
  } else {
    res.json({ result: true, genres: user.genres })
  }

}

)

router.get('/allGenres', async (req, res) => {
  const foundAllUsers = await User.find()
  if (foundAllUsers.length) {
    allGenres = []
    for (const genreArray of foundAllUsers) {
      for (const genre of genreArray.genres) {
        if (!allGenres.some(e => e === genre))
          allGenres.push(genre)
      }
    }
    res.json({ result: true, allGenres: allGenres })
  } else {
    res.json({ result: false })
  }
})



router.post("/like", async (req, res) => {
  if (!checkBody(req.body, ['token'])) {
    res.json({ result: false, error: 'Access denied.' });
    return;
  }
  const foundUser = await User.findOne({ email: req.body.email })

  if (!foundUser.likedprompts.includes(req.body.id)) {
    await User.updateOne({ email: req.body.email },
      { $push: { likedprompts: req.body.id } }
    )
    res.json({ result: true })
  } else {
    await User.updateOne({ email: req.body.email },
      { $pull: { likedprompts: req.body.id } }
    )
    res.json({ result: true })
  }
})





module.exports = router;
