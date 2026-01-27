const express = require('express');
const router = express.Router();
const { getAllTasks, addTask, deleteTask, updateTask,getTask} = require('../controller/tasks_C');
const {valuesToAdd,isValidId,valuesToEdit} = require('../middelware/tasks_MID');
const { isLoggedIn } = require('../middelware/auth_MID');

router.get('/',isLoggedIn,getAllTasks);
router.post('/',isLoggedIn,valuesToAdd,addTask);
router.get('/:id',isLoggedIn,isValidId,getTask);
router.delete('/:id',isLoggedIn,isValidId,deleteTask);
router.patch('/:id',isLoggedIn,isValidId,valuesToEdit,updateTask);

module.exports = router;