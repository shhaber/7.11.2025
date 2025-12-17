const { getAll, getOne, add } = require('../model/tasks_M');

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


async function addTask(req, res) {
    try {
        const UserID = req.user.id;
        const { CategoryID } = req.body;

        let taskId = await add({UserID,CategoryID});

        res.status(201).json({message: "נוסף בהצלחה",taskId});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = {
    getAllTasks,
    getTask,
    addTask,

}