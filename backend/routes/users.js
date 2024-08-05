var express = require('express');
var router = express.Router();

require('../models/connection')


const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2')
const bcrypt = require('bcrypt')





/* Route POST se connecter/signin     */

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.findOne({ email: req.body.email })
    .then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, token: data.token });
      } else {
        res.json({ result: false, error: 'Missing or empty fields' })
      }
    })
});





module.exports = router;
