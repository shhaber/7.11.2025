const express = require('express');
const router = express.Router();
const { getAllTasks, addTask} = require('../controller/tasks_C');
const {validValues} = require('../middelware/tasks_MID');
const { isLoggedIn } = require('../middelware/auth_MID');

router.get('/', isLoggedIn, getAllTasks);
router.post('/', isLoggedIn, validValues, addTask);
router.patch('/:id', isLoggedIn, validValues);

module.exports = router;