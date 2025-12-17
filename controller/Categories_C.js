const { getAll, add, remove, getOne,update } = require('../model/Categories_M');

async function getAllCategories(req, res) {
    try {
        
        let Categories = await getAll(req.user.id);
        if(Categories.length === 0) return res.status(400).json({ message: "אין נתונים" });
        res.status(200).json(Categories);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function addCategory(req, res) {
    try {
        let Name = req.body.Name;
        let User_Id = req.user.id;
        let CategoryId = await add({ Name, User_Id });
        if (!CategoryId) return res.status(500).json({ message: "Server error" });
        res.status(201).json({ message: "נוסף בהצלחה" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteCategory(req, res) {
    try {
        let id = req.params.id;
        let result = await remove(id,req.user.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "נמחק בהצלחה" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
    async function getCategory(req,res) {
        try{
            let Category = await getOne(req.id,req.user.id);
            if(!Category){
                return res.status(400).json({massege:`category is not found`})
            }
            res.status(200).json(Category);
        }catch(err){
            res.status(500).json({massege:"Server error"})
        }
        
    }
    async function updateCategory(req,res){
    try{
        let catId = req.id;
        let User_Id = req.user.id;
        let newName = req.body.Name;
        let affectedRows = await update(catId,User_Id,newName);
        if(!affectedRows){
            return res.status(400).json({massege:`user${req.id} not found!`})
        }
        res.status(200).json({massege:"Update!"});
    }catch(err){
        res.status(500).json({massege:"err"})
    }
}
module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory,
    getCategory,
    updateCategory
};
