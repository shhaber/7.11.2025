const { getAll, getOne, add, remove, update } = require('../model/tasks_M');

async function getAllTasks(req, res) {
    try {
        let tasks = await getAll(req.user.id);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
async function getTask(req, res) {
    try {
        const taskId = req.params.id;

        let task = await getOne(taskId, req.user.id);
        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}


async function addTask(req,res) {
    try{
        let text = req.body.text;
        let UserID = req.user.id;
        const { CategoryID } = req.body;

        let taskId = await add({text,UserID,CategoryID});
        if(!taskId){
            return res.status(500).json({message:"Server error"});
        }
        res.status(201).json({message:"נוסף בהצלחה"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}


async function deleteTask(req, res) {
    try {
        let id = req.params.id;
        let result = await remove(id,req.user.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "נמחק בהצלחה" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function updateTask(req, res) {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const { text, isDone, CategoryID } = req.body;

        const dataToUpdate = {};
        if (text !== undefined) dataToUpdate.text = text;
        if (isDone !== undefined) dataToUpdate.isDone = isDone;
        if (CategoryID !== undefined) dataToUpdate.CategoryID = CategoryID;

        const affectedRows = await update(taskId, userId, dataToUpdate);

        if (affectedRows === 0)
            return res.status(404).json({ message: `Task ${taskId} not found` });

        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

}

module.exports = {
    getAllTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask

}