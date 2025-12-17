const { getAll, getOne, add } = require('../model/tasks_M');

async function getAllTasks(req, res) {
    try {
        
        let tasks = await getAll(req.user.id);
        if(tasks.length === 0) return res.status(400).json({ message: "אין נתונים" });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
async function getTask(req,res) {
        try{
            let task = await getOne(req.id,req.user.id);
            if(!task){
                return res.status(400).json({massege:`task is not found`})
            }
            res.status(200).json(task);
        }catch(err){
            res.status(500).json({massege:"Server error"})
        }
        
    }

async function addTask(req, res) {
    try {
        let UserID = req.user.id;
        let taskId = await add({UserID});
        if (!taskId) return res.status(500).json({ message: "Server error" });
        res.status(201).json({ message: "נוסף בהצלחה" });
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