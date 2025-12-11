const {getAll,add} = require('../model/Categories_M.js');

async function getAllCategories(req,res) {
    try{
        let Categories = await getAll();
        if(Categories.length == 0){
            return res.status(400).json({message:"אין נתונים"})
        }
        res.status(200).json(Categories)
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}

async function addCategory(req,res) {
    try{
        let Name = req.body.name;
        let User_id = req.user.id;

        let CategoryId = await add({Name,User_id});
        if(!CategoryId){
            return res.status(500).json({message:"Server error"});
        }
        res.status(201).json({message:"נוסף בהצלחה"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

module.exports={
    getAllCategories,
    addCategory
}
