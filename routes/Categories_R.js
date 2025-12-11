const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, deleteCategory } = require('../controller/Categories_C');
const { valuesToAdd } = require('../middelware/Catagories_MID');
const { isLoggedIn } = require('../middelware/auth_MID');


router.get('/', isLoggedIn, getAllCategories);
router.post('/', isLoggedIn, valuesToAdd, addCategory);
router.delete('/:id', isLoggedIn, deleteCategory);

module.exports = router;