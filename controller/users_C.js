const {getALL} = require('../model/users_M.js');
async function getALLUsers(req,res){
    try{
        //console.log("hi");
        users = await getALL();
        if(users.length == 0){
            return res.status(400).json({massege:"there is no data"})
        }
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message:"err"})
    }

}
async function getOneUser(req,res){
   try{
        let user= await getOne();
        if(!user){
            return res.status(400).json({massege:`User ${req.id} not found!`})
        }

   } catch(err){
        res.status(500).json({message:"err"})
   }
}
async function deleteUser(params) {
    try{
        let affectedRows = await remove(req,id);
        if(!affectedRows){
            return res.status(400).json({massege:`user${req.id} not found!`})
        }
        res.status(200).json({massege:"deleted!"});
    }catch(err){
        res.status(500).json({massege:"err"})
    }
}
    

module.exports={
    getALLUsers,
    getOneUser,
    deleteUser
}