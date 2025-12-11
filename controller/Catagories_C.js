const {getAll} = require('../model/Catagories_M.js');

async function getALLCatagories(req,res){
    try{
        //console.log("hi");
        let Catagories = await getAll(req,res);
        if(Catagories.length == 0){
            return res.status(400).json({massege:"there is no data"})
        }
        res.status(200).json(Catagories)
    }catch(err){
        res.status(500).json({message:"err"})
    }

}
async function addCatagory(req,res) {
    try{
        let Name = req.body.name;
        let userId= req.user.id;

        let catagoryId = await addUser({Name,userId});
        if(!userId){
            return res.status(500).json({message:"Server error"});
        }
        res.status(201).json({message:"נוסף בהצלחה"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}


module.exports={
    getALLCatagories,
    addCatagory
    
}