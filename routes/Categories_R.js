const express = require('express');
const router = express.Router();
const {getAllCategories,addCategory} = require('../controller/Categories_C');
const {valuesToAdd} = require('../middelware/Catagories_MID');
const {isLoggedIn} = require('../middelware/auth_MID');

router.get('/',isLoggedIn,getAllCategories);
router.post('/',isLoggedIn,valuesToAdd,addCategory);

// router.get('/:id',isValidId,getOneUser);
// router.delete('/:id',isValidId,deleteUser);
// router.patch('/:id',isValidId,valuesToEdit,updateUser);

module.exports = router;
