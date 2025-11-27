const express = require('express');
const router = express.Router();
const {valuesToAdd,encrypPass} = require('../middelware/auth_MID')
const {addUser} = require('../controller/auth_C')

router.post('/reg',valuesToAdd,encrypPass);

module.exports = router;