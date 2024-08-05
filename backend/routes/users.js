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
  }

  // Vérifier que l'utilisateur n'existe pas déjà en base de données
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      // Créer le nouvel utilisateur
      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32)
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






module.exports = router;
