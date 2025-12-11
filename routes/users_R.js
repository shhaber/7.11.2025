const express = require('express');
const router = express.Router();
const {
    getALLUsers,
    getOneUser,
    deleteUser,
    updateUser
} = require('../controller/users_C.js');
const {isValidID, valuesToEdit} = require('../middelware/Users_MID.js');
const {isLoggedIn} = require('../middelware/auth_MID.js');


router.get('/',isLoggedIn,getALLUsers);
router.get('/:id',isValidID, getOneUser);
router.get('/:id', isValidID, deleteUser);
router.patch('/:id', isValidID, valuesToEdit,updateUser);

module.exports = router;