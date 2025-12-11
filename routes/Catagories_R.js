const express = require('express');
const router = express.Router();
const {getALLCatagories,addCatagory} = require('../controller/Catagories_C.js');
const {valuesToAdd} = require('../middelware/Catagories_ID.js');
const {isLoggedIn} = require('../middelware/auth_MID.js');


router.get('/',isLoggedIn,getALLCatagories);
router.post('/reg',isLoggedIn,valuesToAdd,addCatagory);
// router.get('/:id',isValidID, getOneUser);
// router.get('/:id', isValidID, deleteUser);
// router.patch('/:id', isValidID, valuesToEdit,updateUser);
//router.patch('/:id', isValidID,valuesToShow);

module.exports = router;