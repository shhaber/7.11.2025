async function addUser(req,res){
    let affectedRows = await update(req.id,req.user);
    try{
        
    }catch(err){
        res.status(500).json({massege:"err"})
    }
}

module.exports={
    addUser

}