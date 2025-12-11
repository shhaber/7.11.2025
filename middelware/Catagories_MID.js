function valuesToAdd(req,res,next){
    let Name = req.body.Name;
    if(!Name){
        return res.status(400).json({message:"חסרים נתונים"});
    }
    next();
}

module.exports = {
    valuesToAdd
}