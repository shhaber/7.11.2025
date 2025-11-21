const express = require('express');
const router = express.Router();
const {
    getALLUsers,
    getOneUser

} = require('../controller/users_C.js')
const {isValidID} = require('../middelware/Users_MID.js')

router.get('/',getALLUsers);
router.get('/:id',isValidID, getOneUser);


module.exports = router;