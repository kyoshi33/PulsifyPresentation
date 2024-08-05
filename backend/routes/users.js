var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/tools')

/* GET users listing. */
router.post('/addUser', function (req, res, next) {

});

module.exports = router;
