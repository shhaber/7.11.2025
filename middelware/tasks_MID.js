function validValues(req,res,next){
    let name = req.body.Name;
    if(!name){
        return res.status(400).json({message:"חסרים נתונים"});
    }
    next();
}

module.exports = {
    validValues,
}